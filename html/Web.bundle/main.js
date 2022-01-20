const paysafeToken = window.paysafeSingleUseToken;
const paysafeEnv = window.paysafeEnv;

const options = {
  environment: paysafeEnv,
  style: {
    input: {
      'font-family': 'Inter, sans-serif',
      'font-weight': '400',
      'font-size': '14px',
      color: '#111213',
    },
    '::-webkit-input-placeholder': {
      color: '#111213',
    },
  },
  fields: {
    cardNumber: {
      selector: '#cardNumber',
      placeholder: 'Credit Card Number',
    },
    expiryDate: {
      selector: '#expiryDate',
      placeholder: 'Exp. Date (MM / YY)',
    },
    cvv: {
      selector: '#cvv',
      placeholder: 'CVV',
    },
  },
};

const requiredVaultFields = [
  '#cardholderName',
  '#country',
  '#addressLine1',
  '#postalCode',
  '#city',
  '#state',
];

function setOnBlurBorderColor(isValid, field) {
  if (isValid) {
    field.style.borderColor = '#e8e8e8';
  } else {
    field.style.borderColor = '#EC1C24';
  }
}

function setOnFocusBorderColor(field) {
  field.style.borderColor = '#111213';
}

function areVaultFieldsValid() {
  const invalidVaultFields = requiredVaultFields.filter(function (
    fieldSelector,
  ) {
    const fieldInput = document.querySelector(fieldSelector);
    return fieldInput.value === '';
  });

  return invalidVaultFields.length === 0;
}

function checkDisabled() {
  areVaultFieldsValid() ?
    document.getElementById('save').classList.remove("disabled") :
    document.getElementById('save').classList.add("disabled")

}

function getVaultFields() {
  return {
    holderName: document.querySelector('#cardholderName').value,
    billingAddress: {
      country: document.querySelector('#country').value,
      zip: document.querySelector('#postalCode').value,
      state: document.querySelector('#state').value,
      city: document.querySelector('#city').value,
      street: document.querySelector('#addressLine1').value,
      street2: document.querySelector('#addressLine2').value,
    },
  };
}

function transformPostalCode(e, fieldInput) {
  fieldInput.value = e.target.value.replace(/[^a-z0-9]/gi, '').toUpperCase();
}

paysafe.fields.setup(paysafeToken, options, function (instance, error) {
  if (error) {
    const initializationError = { initError: error };
    window.ReactNativeWebView.postMessage(JSON.stringify(initializationError));
  } else {
    instance
      .fields('cvv')
      .focus(function () {
        setOnFocusBorderColor(this);
      })
      .blur(function () {
        var isValid = instance.fields.cvv.isValid();
        setOnBlurBorderColor(isValid, this);
      });

    instance
      .fields('cardNumber')
      .focus(function () {
        setOnFocusBorderColor(this);
      })
      .blur(function () {
        var isValid = instance.fields.cardNumber.isValid();
        setOnBlurBorderColor(isValid, this);
      });

    instance
      .fields('expiryDate')
      .focus(function () {
        setOnFocusBorderColor(this);
      })
      .blur(function () {
        var isValid = instance.fields.expiryDate.isValid();
        setOnBlurBorderColor(isValid, this);
      });

    requiredVaultFields.map(function (fieldSelector) {
      const fieldInput = document.querySelector(fieldSelector);

      if (fieldSelector === '#postalCode') {
        fieldInput.addEventListener('input', function (e) {
          transformPostalCode(e, fieldInput);
        });
      }

      fieldInput.onfocus = function () {
        setOnFocusBorderColor(fieldInput);
      };
      fieldInput.onblur = function () {
        const isValid = fieldInput.value !== '';
        setOnBlurBorderColor(isValid, fieldInput);
      };
    });

    const addressLine2Input = document.querySelector('#addressLine2');
    addressLine2Input.onfocus = function () {
      setOnFocusBorderColor(addressLine2Input);
    };
    addressLine2Input.onblur = function () {
      addressLine2Input.style.borderColor = '#e8e8e8';
    };
  }

  document.getElementById('save').addEventListener(
    'click',
    function () {
      const isFormValid = instance.areAllFieldsValid() && areVaultFieldsValid();
      if (isFormValid) {
        const vaultFieldsObject = getVaultFields();
        instance.tokenize(
          {
            vault: vaultFieldsObject,
          },
          function (_, tokenizeError, result) {
            if (tokenizeError) {
              const errorMessage = { error: tokenizeError };
              window.ReactNativeWebView.postMessage(
                JSON.stringify(errorMessage),
              );
            } else {
              const successMessage = { token: result.token };
              window.ReactNativeWebView.postMessage(
                JSON.stringify(successMessage),
              );
            }
          },
        );
      }
    },
    false,
  );
});
