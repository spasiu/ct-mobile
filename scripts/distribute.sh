#!/usr/bin/env bash

handleError() {
  echo "Error: $1"
  exit 1
}

update() {
  sed -i "" -e "s/$1 \= [^\;]*\;/$1 = $2;/" CardsAndTreasure.xcodeproj/project.pbxproj
}

if [ -z "$1" ]
  then
    echo "No marketing version number."
    exit 1
fi

if [ -z "$2" ]
  then
    echo "No build version number."
    exit 1
fi

cd ios
update "MARKETING_VERSION" $1
update "CURRENT_PROJECT_VERSION" $2
echo "Building v$1 ($2)..."
xcodebuild ARCHS=arm64 -archivePath CardsAndTreasure.xcarchive -workspace CardsAndTreasure.xcworkspace -scheme CardsAndTreasure -destination 'generic/platform=iOS' archive || handleError "archive failed"
echo "Uploading v$1 ($2)..."
xcodebuild -exportArchive -archivePath CardsAndTreasure.xcarchive -exportOptionsPlist ExportOptions.plist || handleError "upload failed"
