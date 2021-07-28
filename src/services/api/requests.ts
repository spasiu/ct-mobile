import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _text: any;
  jsonb: any;
  numeric: any;
  timestamptz: any;
  uuid: any;
};


/** columns and relationships of "Addresses" */
export type Addresses = {
  __typename?: 'Addresses';
  /** An object relationship */
  User: Users;
  city: Scalars['String'];
  country: Scalars['String'];
  created_at: Scalars['timestamptz'];
  first_name: Scalars['String'];
  id: Scalars['uuid'];
  is_default: Scalars['Boolean'];
  last_name: Scalars['String'];
  line1: Scalars['String'];
  line2?: Maybe<Scalars['String']>;
  postal_zip_code: Scalars['String'];
  state_provice_region: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['String'];
};

/** aggregated selection of "Addresses" */
export type Addresses_Aggregate = {
  __typename?: 'Addresses_aggregate';
  aggregate?: Maybe<Addresses_Aggregate_Fields>;
  nodes: Array<Addresses>;
};

/** aggregate fields of "Addresses" */
export type Addresses_Aggregate_Fields = {
  __typename?: 'Addresses_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Addresses_Max_Fields>;
  min?: Maybe<Addresses_Min_Fields>;
};


/** aggregate fields of "Addresses" */
export type Addresses_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Addresses_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Addresses" */
export type Addresses_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Addresses_Max_Order_By>;
  min?: Maybe<Addresses_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Addresses" */
export type Addresses_Arr_Rel_Insert_Input = {
  data: Array<Addresses_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Addresses_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Addresses". All fields are combined with a logical 'AND'. */
export type Addresses_Bool_Exp = {
  User?: Maybe<Users_Bool_Exp>;
  _and?: Maybe<Array<Addresses_Bool_Exp>>;
  _not?: Maybe<Addresses_Bool_Exp>;
  _or?: Maybe<Array<Addresses_Bool_Exp>>;
  city?: Maybe<String_Comparison_Exp>;
  country?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  first_name?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  is_default?: Maybe<Boolean_Comparison_Exp>;
  last_name?: Maybe<String_Comparison_Exp>;
  line1?: Maybe<String_Comparison_Exp>;
  line2?: Maybe<String_Comparison_Exp>;
  postal_zip_code?: Maybe<String_Comparison_Exp>;
  state_provice_region?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Addresses" */
export enum Addresses_Constraint {
  /** unique or primary key constraint */
  AddressesPkey = 'Addresses_pkey'
}

/** input type for inserting data into table "Addresses" */
export type Addresses_Insert_Input = {
  User?: Maybe<Users_Obj_Rel_Insert_Input>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  is_default?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postal_zip_code?: Maybe<Scalars['String']>;
  state_provice_region?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Addresses_Max_Fields = {
  __typename?: 'Addresses_max_fields';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postal_zip_code?: Maybe<Scalars['String']>;
  state_provice_region?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Addresses" */
export type Addresses_Max_Order_By = {
  city?: Maybe<Order_By>;
  country?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  line1?: Maybe<Order_By>;
  line2?: Maybe<Order_By>;
  postal_zip_code?: Maybe<Order_By>;
  state_provice_region?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Addresses_Min_Fields = {
  __typename?: 'Addresses_min_fields';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postal_zip_code?: Maybe<Scalars['String']>;
  state_provice_region?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Addresses" */
export type Addresses_Min_Order_By = {
  city?: Maybe<Order_By>;
  country?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  line1?: Maybe<Order_By>;
  line2?: Maybe<Order_By>;
  postal_zip_code?: Maybe<Order_By>;
  state_provice_region?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "Addresses" */
export type Addresses_Mutation_Response = {
  __typename?: 'Addresses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Addresses>;
};

/** on conflict condition type for table "Addresses" */
export type Addresses_On_Conflict = {
  constraint: Addresses_Constraint;
  update_columns?: Array<Addresses_Update_Column>;
  where?: Maybe<Addresses_Bool_Exp>;
};

/** Ordering options when selecting data from "Addresses". */
export type Addresses_Order_By = {
  User?: Maybe<Users_Order_By>;
  city?: Maybe<Order_By>;
  country?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_default?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  line1?: Maybe<Order_By>;
  line2?: Maybe<Order_By>;
  postal_zip_code?: Maybe<Order_By>;
  state_provice_region?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: Addresses */
export type Addresses_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Addresses" */
export enum Addresses_Select_Column {
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  IsDefault = 'is_default',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Line1 = 'line1',
  /** column name */
  Line2 = 'line2',
  /** column name */
  PostalZipCode = 'postal_zip_code',
  /** column name */
  StateProviceRegion = 'state_provice_region',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "Addresses" */
export type Addresses_Set_Input = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  is_default?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postal_zip_code?: Maybe<Scalars['String']>;
  state_provice_region?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "Addresses" */
export enum Addresses_Update_Column {
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  IsDefault = 'is_default',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Line1 = 'line1',
  /** column name */
  Line2 = 'line2',
  /** column name */
  PostalZipCode = 'postal_zip_code',
  /** column name */
  StateProviceRegion = 'state_provice_region',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** columns and relationships of "BreakProductItems" */
export type BreakProductItems = {
  __typename?: 'BreakProductItems';
  /** An object relationship */
  Break: Breaks;
  /** An object relationship */
  Order?: Maybe<Orders>;
  bc_product_id: Scalars['Int'];
  bc_variant_id?: Maybe<Scalars['Int']>;
  break_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  order_id?: Maybe<Scalars['uuid']>;
  price: Scalars['numeric'];
  quantity: Scalars['Int'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "BreakProductItems" */
export type BreakProductItems_Aggregate = {
  __typename?: 'BreakProductItems_aggregate';
  aggregate?: Maybe<BreakProductItems_Aggregate_Fields>;
  nodes: Array<BreakProductItems>;
};

/** aggregate fields of "BreakProductItems" */
export type BreakProductItems_Aggregate_Fields = {
  __typename?: 'BreakProductItems_aggregate_fields';
  avg?: Maybe<BreakProductItems_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<BreakProductItems_Max_Fields>;
  min?: Maybe<BreakProductItems_Min_Fields>;
  stddev?: Maybe<BreakProductItems_Stddev_Fields>;
  stddev_pop?: Maybe<BreakProductItems_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<BreakProductItems_Stddev_Samp_Fields>;
  sum?: Maybe<BreakProductItems_Sum_Fields>;
  var_pop?: Maybe<BreakProductItems_Var_Pop_Fields>;
  var_samp?: Maybe<BreakProductItems_Var_Samp_Fields>;
  variance?: Maybe<BreakProductItems_Variance_Fields>;
};


/** aggregate fields of "BreakProductItems" */
export type BreakProductItems_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<BreakProductItems_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "BreakProductItems" */
export type BreakProductItems_Aggregate_Order_By = {
  avg?: Maybe<BreakProductItems_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<BreakProductItems_Max_Order_By>;
  min?: Maybe<BreakProductItems_Min_Order_By>;
  stddev?: Maybe<BreakProductItems_Stddev_Order_By>;
  stddev_pop?: Maybe<BreakProductItems_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<BreakProductItems_Stddev_Samp_Order_By>;
  sum?: Maybe<BreakProductItems_Sum_Order_By>;
  var_pop?: Maybe<BreakProductItems_Var_Pop_Order_By>;
  var_samp?: Maybe<BreakProductItems_Var_Samp_Order_By>;
  variance?: Maybe<BreakProductItems_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "BreakProductItems" */
export type BreakProductItems_Arr_Rel_Insert_Input = {
  data: Array<BreakProductItems_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<BreakProductItems_On_Conflict>;
};

/** aggregate avg on columns */
export type BreakProductItems_Avg_Fields = {
  __typename?: 'BreakProductItems_avg_fields';
  bc_product_id?: Maybe<Scalars['Float']>;
  bc_variant_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "BreakProductItems" */
export type BreakProductItems_Avg_Order_By = {
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "BreakProductItems". All fields are combined with a logical 'AND'. */
export type BreakProductItems_Bool_Exp = {
  Break?: Maybe<Breaks_Bool_Exp>;
  Order?: Maybe<Orders_Bool_Exp>;
  _and?: Maybe<Array<BreakProductItems_Bool_Exp>>;
  _not?: Maybe<BreakProductItems_Bool_Exp>;
  _or?: Maybe<Array<BreakProductItems_Bool_Exp>>;
  bc_product_id?: Maybe<Int_Comparison_Exp>;
  bc_variant_id?: Maybe<Int_Comparison_Exp>;
  break_id?: Maybe<Uuid_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  order_id?: Maybe<Uuid_Comparison_Exp>;
  price?: Maybe<Numeric_Comparison_Exp>;
  quantity?: Maybe<Int_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "BreakProductItems" */
export enum BreakProductItems_Constraint {
  /** unique or primary key constraint */
  BreakProductItemsPkey = 'BreakProductItems_pkey'
}

/** input type for incrementing numeric columns in table "BreakProductItems" */
export type BreakProductItems_Inc_Input = {
  bc_product_id?: Maybe<Scalars['Int']>;
  bc_variant_id?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['numeric']>;
  quantity?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "BreakProductItems" */
export type BreakProductItems_Insert_Input = {
  Break?: Maybe<Breaks_Obj_Rel_Insert_Input>;
  Order?: Maybe<Orders_Obj_Rel_Insert_Input>;
  bc_product_id?: Maybe<Scalars['Int']>;
  bc_variant_id?: Maybe<Scalars['Int']>;
  break_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  order_id?: Maybe<Scalars['uuid']>;
  price?: Maybe<Scalars['numeric']>;
  quantity?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type BreakProductItems_Max_Fields = {
  __typename?: 'BreakProductItems_max_fields';
  bc_product_id?: Maybe<Scalars['Int']>;
  bc_variant_id?: Maybe<Scalars['Int']>;
  break_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  order_id?: Maybe<Scalars['uuid']>;
  price?: Maybe<Scalars['numeric']>;
  quantity?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "BreakProductItems" */
export type BreakProductItems_Max_Order_By = {
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  break_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type BreakProductItems_Min_Fields = {
  __typename?: 'BreakProductItems_min_fields';
  bc_product_id?: Maybe<Scalars['Int']>;
  bc_variant_id?: Maybe<Scalars['Int']>;
  break_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  order_id?: Maybe<Scalars['uuid']>;
  price?: Maybe<Scalars['numeric']>;
  quantity?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "BreakProductItems" */
export type BreakProductItems_Min_Order_By = {
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  break_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "BreakProductItems" */
export type BreakProductItems_Mutation_Response = {
  __typename?: 'BreakProductItems_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<BreakProductItems>;
};

/** on conflict condition type for table "BreakProductItems" */
export type BreakProductItems_On_Conflict = {
  constraint: BreakProductItems_Constraint;
  update_columns?: Array<BreakProductItems_Update_Column>;
  where?: Maybe<BreakProductItems_Bool_Exp>;
};

/** Ordering options when selecting data from "BreakProductItems". */
export type BreakProductItems_Order_By = {
  Break?: Maybe<Breaks_Order_By>;
  Order?: Maybe<Orders_Order_By>;
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  break_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: BreakProductItems */
export type BreakProductItems_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "BreakProductItems" */
export enum BreakProductItems_Select_Column {
  /** column name */
  BcProductId = 'bc_product_id',
  /** column name */
  BcVariantId = 'bc_variant_id',
  /** column name */
  BreakId = 'break_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  Price = 'price',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "BreakProductItems" */
export type BreakProductItems_Set_Input = {
  bc_product_id?: Maybe<Scalars['Int']>;
  bc_variant_id?: Maybe<Scalars['Int']>;
  break_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  order_id?: Maybe<Scalars['uuid']>;
  price?: Maybe<Scalars['numeric']>;
  quantity?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type BreakProductItems_Stddev_Fields = {
  __typename?: 'BreakProductItems_stddev_fields';
  bc_product_id?: Maybe<Scalars['Float']>;
  bc_variant_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "BreakProductItems" */
export type BreakProductItems_Stddev_Order_By = {
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type BreakProductItems_Stddev_Pop_Fields = {
  __typename?: 'BreakProductItems_stddev_pop_fields';
  bc_product_id?: Maybe<Scalars['Float']>;
  bc_variant_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "BreakProductItems" */
export type BreakProductItems_Stddev_Pop_Order_By = {
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type BreakProductItems_Stddev_Samp_Fields = {
  __typename?: 'BreakProductItems_stddev_samp_fields';
  bc_product_id?: Maybe<Scalars['Float']>;
  bc_variant_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "BreakProductItems" */
export type BreakProductItems_Stddev_Samp_Order_By = {
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type BreakProductItems_Sum_Fields = {
  __typename?: 'BreakProductItems_sum_fields';
  bc_product_id?: Maybe<Scalars['Int']>;
  bc_variant_id?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['numeric']>;
  quantity?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "BreakProductItems" */
export type BreakProductItems_Sum_Order_By = {
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
};

/** update columns of table "BreakProductItems" */
export enum BreakProductItems_Update_Column {
  /** column name */
  BcProductId = 'bc_product_id',
  /** column name */
  BcVariantId = 'bc_variant_id',
  /** column name */
  BreakId = 'break_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  Price = 'price',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type BreakProductItems_Var_Pop_Fields = {
  __typename?: 'BreakProductItems_var_pop_fields';
  bc_product_id?: Maybe<Scalars['Float']>;
  bc_variant_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "BreakProductItems" */
export type BreakProductItems_Var_Pop_Order_By = {
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type BreakProductItems_Var_Samp_Fields = {
  __typename?: 'BreakProductItems_var_samp_fields';
  bc_product_id?: Maybe<Scalars['Float']>;
  bc_variant_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "BreakProductItems" */
export type BreakProductItems_Var_Samp_Order_By = {
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type BreakProductItems_Variance_Fields = {
  __typename?: 'BreakProductItems_variance_fields';
  bc_product_id?: Maybe<Scalars['Float']>;
  bc_variant_id?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "BreakProductItems" */
export type BreakProductItems_Variance_Order_By = {
  bc_product_id?: Maybe<Order_By>;
  bc_variant_id?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  quantity?: Maybe<Order_By>;
};

/** columns and relationships of "BreakerProfiles" */
export type BreakerProfiles = {
  __typename?: 'BreakerProfiles';
  /** An object relationship */
  User: Users;
  bio: Scalars['String'];
  created_at: Scalars['timestamptz'];
  facebook?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['String'];
  video: Scalars['String'];
};

/** aggregated selection of "BreakerProfiles" */
export type BreakerProfiles_Aggregate = {
  __typename?: 'BreakerProfiles_aggregate';
  aggregate?: Maybe<BreakerProfiles_Aggregate_Fields>;
  nodes: Array<BreakerProfiles>;
};

/** aggregate fields of "BreakerProfiles" */
export type BreakerProfiles_Aggregate_Fields = {
  __typename?: 'BreakerProfiles_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<BreakerProfiles_Max_Fields>;
  min?: Maybe<BreakerProfiles_Min_Fields>;
};


/** aggregate fields of "BreakerProfiles" */
export type BreakerProfiles_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<BreakerProfiles_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "BreakerProfiles". All fields are combined with a logical 'AND'. */
export type BreakerProfiles_Bool_Exp = {
  User?: Maybe<Users_Bool_Exp>;
  _and?: Maybe<Array<BreakerProfiles_Bool_Exp>>;
  _not?: Maybe<BreakerProfiles_Bool_Exp>;
  _or?: Maybe<Array<BreakerProfiles_Bool_Exp>>;
  bio?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  facebook?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  instagram?: Maybe<String_Comparison_Exp>;
  linkedin?: Maybe<String_Comparison_Exp>;
  tiktok?: Maybe<String_Comparison_Exp>;
  twitter?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
  video?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "BreakerProfiles" */
export enum BreakerProfiles_Constraint {
  /** unique or primary key constraint */
  BreakerProfilesPkey = 'BreakerProfiles_pkey',
  /** unique or primary key constraint */
  BreakerProfilesUserIdKey = 'BreakerProfiles_user_id_key'
}

/** input type for inserting data into table "BreakerProfiles" */
export type BreakerProfiles_Insert_Input = {
  User?: Maybe<Users_Obj_Rel_Insert_Input>;
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  facebook?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type BreakerProfiles_Max_Fields = {
  __typename?: 'BreakerProfiles_max_fields';
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  facebook?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type BreakerProfiles_Min_Fields = {
  __typename?: 'BreakerProfiles_min_fields';
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  facebook?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "BreakerProfiles" */
export type BreakerProfiles_Mutation_Response = {
  __typename?: 'BreakerProfiles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<BreakerProfiles>;
};

/** input type for inserting object relation for remote table "BreakerProfiles" */
export type BreakerProfiles_Obj_Rel_Insert_Input = {
  data: BreakerProfiles_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<BreakerProfiles_On_Conflict>;
};

/** on conflict condition type for table "BreakerProfiles" */
export type BreakerProfiles_On_Conflict = {
  constraint: BreakerProfiles_Constraint;
  update_columns?: Array<BreakerProfiles_Update_Column>;
  where?: Maybe<BreakerProfiles_Bool_Exp>;
};

/** Ordering options when selecting data from "BreakerProfiles". */
export type BreakerProfiles_Order_By = {
  User?: Maybe<Users_Order_By>;
  bio?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  facebook?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  instagram?: Maybe<Order_By>;
  linkedin?: Maybe<Order_By>;
  tiktok?: Maybe<Order_By>;
  twitter?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  video?: Maybe<Order_By>;
};

/** primary key columns input for table: BreakerProfiles */
export type BreakerProfiles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "BreakerProfiles" */
export enum BreakerProfiles_Select_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Facebook = 'facebook',
  /** column name */
  Id = 'id',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  Linkedin = 'linkedin',
  /** column name */
  Tiktok = 'tiktok',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Video = 'video'
}

/** input type for updating data in table "BreakerProfiles" */
export type BreakerProfiles_Set_Input = {
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  facebook?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

/** update columns of table "BreakerProfiles" */
export enum BreakerProfiles_Update_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Facebook = 'facebook',
  /** column name */
  Id = 'id',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  Linkedin = 'linkedin',
  /** column name */
  Tiktok = 'tiktok',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Video = 'video'
}

/** columns and relationships of "Breaks" */
export type Breaks = {
  __typename?: 'Breaks';
  /** An array relationship */
  BreakProductItems: Array<BreakProductItems>;
  /** An aggregate relationship */
  BreakProductItems_aggregate: BreakProductItems_Aggregate;
  /** An object relationship */
  Event: Events;
  /** An array relationship */
  Inventory: Array<Inventory>;
  /** An aggregate relationship */
  Inventory_aggregate: Inventory_Aggregate;
  /** An object relationship */
  break_status: Break_Status;
  break_type: Break_Type_Enum;
  created_at: Scalars['timestamptz'];
  description: Scalars['String'];
  event_id: Scalars['uuid'];
  id: Scalars['uuid'];
  image: Scalars['String'];
  line_items?: Maybe<Scalars['jsonb']>;
  price?: Maybe<Scalars['numeric']>;
  spots: Scalars['Int'];
  status: Break_Status_Enum;
  teams_per_spot?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  /** An object relationship */
  type: Break_Type;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "Breaks" */
export type BreaksBreakProductItemsArgs = {
  distinct_on?: Maybe<Array<BreakProductItems_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakProductItems_Order_By>>;
  where?: Maybe<BreakProductItems_Bool_Exp>;
};


/** columns and relationships of "Breaks" */
export type BreaksBreakProductItems_AggregateArgs = {
  distinct_on?: Maybe<Array<BreakProductItems_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakProductItems_Order_By>>;
  where?: Maybe<BreakProductItems_Bool_Exp>;
};


/** columns and relationships of "Breaks" */
export type BreaksInventoryArgs = {
  distinct_on?: Maybe<Array<Inventory_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Inventory_Order_By>>;
  where?: Maybe<Inventory_Bool_Exp>;
};


/** columns and relationships of "Breaks" */
export type BreaksInventory_AggregateArgs = {
  distinct_on?: Maybe<Array<Inventory_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Inventory_Order_By>>;
  where?: Maybe<Inventory_Bool_Exp>;
};


/** columns and relationships of "Breaks" */
export type BreaksLine_ItemsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "Breaks" */
export type Breaks_Aggregate = {
  __typename?: 'Breaks_aggregate';
  aggregate?: Maybe<Breaks_Aggregate_Fields>;
  nodes: Array<Breaks>;
};

/** aggregate fields of "Breaks" */
export type Breaks_Aggregate_Fields = {
  __typename?: 'Breaks_aggregate_fields';
  avg?: Maybe<Breaks_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Breaks_Max_Fields>;
  min?: Maybe<Breaks_Min_Fields>;
  stddev?: Maybe<Breaks_Stddev_Fields>;
  stddev_pop?: Maybe<Breaks_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Breaks_Stddev_Samp_Fields>;
  sum?: Maybe<Breaks_Sum_Fields>;
  var_pop?: Maybe<Breaks_Var_Pop_Fields>;
  var_samp?: Maybe<Breaks_Var_Samp_Fields>;
  variance?: Maybe<Breaks_Variance_Fields>;
};


/** aggregate fields of "Breaks" */
export type Breaks_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Breaks_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Breaks" */
export type Breaks_Aggregate_Order_By = {
  avg?: Maybe<Breaks_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Breaks_Max_Order_By>;
  min?: Maybe<Breaks_Min_Order_By>;
  stddev?: Maybe<Breaks_Stddev_Order_By>;
  stddev_pop?: Maybe<Breaks_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Breaks_Stddev_Samp_Order_By>;
  sum?: Maybe<Breaks_Sum_Order_By>;
  var_pop?: Maybe<Breaks_Var_Pop_Order_By>;
  var_samp?: Maybe<Breaks_Var_Samp_Order_By>;
  variance?: Maybe<Breaks_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Breaks_Append_Input = {
  line_items?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "Breaks" */
export type Breaks_Arr_Rel_Insert_Input = {
  data: Array<Breaks_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Breaks_On_Conflict>;
};

/** aggregate avg on columns */
export type Breaks_Avg_Fields = {
  __typename?: 'Breaks_avg_fields';
  price?: Maybe<Scalars['Float']>;
  spots?: Maybe<Scalars['Float']>;
  teams_per_spot?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Breaks" */
export type Breaks_Avg_Order_By = {
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Breaks". All fields are combined with a logical 'AND'. */
export type Breaks_Bool_Exp = {
  BreakProductItems?: Maybe<BreakProductItems_Bool_Exp>;
  Event?: Maybe<Events_Bool_Exp>;
  Inventory?: Maybe<Inventory_Bool_Exp>;
  _and?: Maybe<Array<Breaks_Bool_Exp>>;
  _not?: Maybe<Breaks_Bool_Exp>;
  _or?: Maybe<Array<Breaks_Bool_Exp>>;
  break_status?: Maybe<Break_Status_Bool_Exp>;
  break_type?: Maybe<Break_Type_Enum_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  event_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  line_items?: Maybe<Jsonb_Comparison_Exp>;
  price?: Maybe<Numeric_Comparison_Exp>;
  spots?: Maybe<Int_Comparison_Exp>;
  status?: Maybe<Break_Status_Enum_Comparison_Exp>;
  teams_per_spot?: Maybe<Int_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  type?: Maybe<Break_Type_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Breaks" */
export enum Breaks_Constraint {
  /** unique or primary key constraint */
  BreaksPkey = 'Breaks_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Breaks_Delete_At_Path_Input = {
  line_items?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Breaks_Delete_Elem_Input = {
  line_items?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Breaks_Delete_Key_Input = {
  line_items?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "Breaks" */
export type Breaks_Inc_Input = {
  price?: Maybe<Scalars['numeric']>;
  spots?: Maybe<Scalars['Int']>;
  teams_per_spot?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "Breaks" */
export type Breaks_Insert_Input = {
  BreakProductItems?: Maybe<BreakProductItems_Arr_Rel_Insert_Input>;
  Event?: Maybe<Events_Obj_Rel_Insert_Input>;
  Inventory?: Maybe<Inventory_Arr_Rel_Insert_Input>;
  break_status?: Maybe<Break_Status_Obj_Rel_Insert_Input>;
  break_type?: Maybe<Break_Type_Enum>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  event_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  line_items?: Maybe<Scalars['jsonb']>;
  price?: Maybe<Scalars['numeric']>;
  spots?: Maybe<Scalars['Int']>;
  status?: Maybe<Break_Status_Enum>;
  teams_per_spot?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Break_Type_Obj_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Breaks_Max_Fields = {
  __typename?: 'Breaks_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  event_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  spots?: Maybe<Scalars['Int']>;
  teams_per_spot?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "Breaks" */
export type Breaks_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  event_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Breaks_Min_Fields = {
  __typename?: 'Breaks_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  event_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  spots?: Maybe<Scalars['Int']>;
  teams_per_spot?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "Breaks" */
export type Breaks_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  event_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "Breaks" */
export type Breaks_Mutation_Response = {
  __typename?: 'Breaks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Breaks>;
};

/** input type for inserting object relation for remote table "Breaks" */
export type Breaks_Obj_Rel_Insert_Input = {
  data: Breaks_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Breaks_On_Conflict>;
};

/** on conflict condition type for table "Breaks" */
export type Breaks_On_Conflict = {
  constraint: Breaks_Constraint;
  update_columns?: Array<Breaks_Update_Column>;
  where?: Maybe<Breaks_Bool_Exp>;
};

/** Ordering options when selecting data from "Breaks". */
export type Breaks_Order_By = {
  BreakProductItems_aggregate?: Maybe<BreakProductItems_Aggregate_Order_By>;
  Event?: Maybe<Events_Order_By>;
  Inventory_aggregate?: Maybe<Inventory_Aggregate_Order_By>;
  break_status?: Maybe<Break_Status_Order_By>;
  break_type?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  event_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  line_items?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  type?: Maybe<Break_Type_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: Breaks */
export type Breaks_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Breaks_Prepend_Input = {
  line_items?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "Breaks" */
export enum Breaks_Select_Column {
  /** column name */
  BreakType = 'break_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  LineItems = 'line_items',
  /** column name */
  Price = 'price',
  /** column name */
  Spots = 'spots',
  /** column name */
  Status = 'status',
  /** column name */
  TeamsPerSpot = 'teams_per_spot',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "Breaks" */
export type Breaks_Set_Input = {
  break_type?: Maybe<Break_Type_Enum>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  event_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  line_items?: Maybe<Scalars['jsonb']>;
  price?: Maybe<Scalars['numeric']>;
  spots?: Maybe<Scalars['Int']>;
  status?: Maybe<Break_Status_Enum>;
  teams_per_spot?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Breaks_Stddev_Fields = {
  __typename?: 'Breaks_stddev_fields';
  price?: Maybe<Scalars['Float']>;
  spots?: Maybe<Scalars['Float']>;
  teams_per_spot?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Breaks" */
export type Breaks_Stddev_Order_By = {
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Breaks_Stddev_Pop_Fields = {
  __typename?: 'Breaks_stddev_pop_fields';
  price?: Maybe<Scalars['Float']>;
  spots?: Maybe<Scalars['Float']>;
  teams_per_spot?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Breaks" */
export type Breaks_Stddev_Pop_Order_By = {
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Breaks_Stddev_Samp_Fields = {
  __typename?: 'Breaks_stddev_samp_fields';
  price?: Maybe<Scalars['Float']>;
  spots?: Maybe<Scalars['Float']>;
  teams_per_spot?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Breaks" */
export type Breaks_Stddev_Samp_Order_By = {
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Breaks_Sum_Fields = {
  __typename?: 'Breaks_sum_fields';
  price?: Maybe<Scalars['numeric']>;
  spots?: Maybe<Scalars['Int']>;
  teams_per_spot?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Breaks" */
export type Breaks_Sum_Order_By = {
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
};

/** update columns of table "Breaks" */
export enum Breaks_Update_Column {
  /** column name */
  BreakType = 'break_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  LineItems = 'line_items',
  /** column name */
  Price = 'price',
  /** column name */
  Spots = 'spots',
  /** column name */
  Status = 'status',
  /** column name */
  TeamsPerSpot = 'teams_per_spot',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Breaks_Var_Pop_Fields = {
  __typename?: 'Breaks_var_pop_fields';
  price?: Maybe<Scalars['Float']>;
  spots?: Maybe<Scalars['Float']>;
  teams_per_spot?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Breaks" */
export type Breaks_Var_Pop_Order_By = {
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Breaks_Var_Samp_Fields = {
  __typename?: 'Breaks_var_samp_fields';
  price?: Maybe<Scalars['Float']>;
  spots?: Maybe<Scalars['Float']>;
  teams_per_spot?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Breaks" */
export type Breaks_Var_Samp_Order_By = {
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Breaks_Variance_Fields = {
  __typename?: 'Breaks_variance_fields';
  price?: Maybe<Scalars['Float']>;
  spots?: Maybe<Scalars['Float']>;
  teams_per_spot?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Breaks" */
export type Breaks_Variance_Order_By = {
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
};

/** columns and relationships of "Events" */
export type Events = {
  __typename?: 'Events';
  /** An array relationship */
  Breaks: Array<Breaks>;
  /** An aggregate relationship */
  Breaks_aggregate: Breaks_Aggregate;
  /** An object relationship */
  User: Users;
  created_at: Scalars['timestamptz'];
  description: Scalars['String'];
  /** An object relationship */
  event_status: Event_Status;
  id: Scalars['uuid'];
  image: Scalars['String'];
  start_time: Scalars['timestamptz'];
  status: Event_Status_Enum;
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['String'];
};


/** columns and relationships of "Events" */
export type EventsBreaksArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};


/** columns and relationships of "Events" */
export type EventsBreaks_AggregateArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};

/** aggregated selection of "Events" */
export type Events_Aggregate = {
  __typename?: 'Events_aggregate';
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

/** aggregate fields of "Events" */
export type Events_Aggregate_Fields = {
  __typename?: 'Events_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
};


/** aggregate fields of "Events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Events" */
export type Events_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Events_Max_Order_By>;
  min?: Maybe<Events_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Events" */
export type Events_Arr_Rel_Insert_Input = {
  data: Array<Events_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Events_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  Breaks?: Maybe<Breaks_Bool_Exp>;
  User?: Maybe<Users_Bool_Exp>;
  _and?: Maybe<Array<Events_Bool_Exp>>;
  _not?: Maybe<Events_Bool_Exp>;
  _or?: Maybe<Array<Events_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  event_status?: Maybe<Event_Status_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  start_time?: Maybe<Timestamptz_Comparison_Exp>;
  status?: Maybe<Event_Status_Enum_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Events" */
export enum Events_Constraint {
  /** unique or primary key constraint */
  EventsPkey = 'Events_pkey'
}

/** input type for inserting data into table "Events" */
export type Events_Insert_Input = {
  Breaks?: Maybe<Breaks_Arr_Rel_Insert_Input>;
  User?: Maybe<Users_Obj_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  event_status?: Maybe<Event_Status_Obj_Rel_Insert_Input>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Event_Status_Enum>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'Events_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Events" */
export type Events_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  start_time?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'Events_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Events" */
export type Events_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  start_time?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "Events" */
export type Events_Mutation_Response = {
  __typename?: 'Events_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Events>;
};

/** input type for inserting object relation for remote table "Events" */
export type Events_Obj_Rel_Insert_Input = {
  data: Events_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Events_On_Conflict>;
};

/** on conflict condition type for table "Events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns?: Array<Events_Update_Column>;
  where?: Maybe<Events_Bool_Exp>;
};

/** Ordering options when selecting data from "Events". */
export type Events_Order_By = {
  Breaks_aggregate?: Maybe<Breaks_Aggregate_Order_By>;
  User?: Maybe<Users_Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  event_status?: Maybe<Event_Status_Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  start_time?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: Events */
export type Events_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Events" */
export enum Events_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "Events" */
export type Events_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Event_Status_Enum>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "Events" */
export enum Events_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "ExtensibleValues" */
export type ExtensibleValues = {
  __typename?: 'ExtensibleValues';
  field: Scalars['String'];
  id: Scalars['uuid'];
  value: Scalars['String'];
};

/** aggregated selection of "ExtensibleValues" */
export type ExtensibleValues_Aggregate = {
  __typename?: 'ExtensibleValues_aggregate';
  aggregate?: Maybe<ExtensibleValues_Aggregate_Fields>;
  nodes: Array<ExtensibleValues>;
};

/** aggregate fields of "ExtensibleValues" */
export type ExtensibleValues_Aggregate_Fields = {
  __typename?: 'ExtensibleValues_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<ExtensibleValues_Max_Fields>;
  min?: Maybe<ExtensibleValues_Min_Fields>;
};


/** aggregate fields of "ExtensibleValues" */
export type ExtensibleValues_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ExtensibleValues_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "ExtensibleValues". All fields are combined with a logical 'AND'. */
export type ExtensibleValues_Bool_Exp = {
  _and?: Maybe<Array<ExtensibleValues_Bool_Exp>>;
  _not?: Maybe<ExtensibleValues_Bool_Exp>;
  _or?: Maybe<Array<ExtensibleValues_Bool_Exp>>;
  field?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "ExtensibleValues" */
export enum ExtensibleValues_Constraint {
  /** unique or primary key constraint */
  ExtensibleValuesPkey = 'ExtensibleValues_pkey'
}

/** input type for inserting data into table "ExtensibleValues" */
export type ExtensibleValues_Insert_Input = {
  field?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type ExtensibleValues_Max_Fields = {
  __typename?: 'ExtensibleValues_max_fields';
  field?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type ExtensibleValues_Min_Fields = {
  __typename?: 'ExtensibleValues_min_fields';
  field?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "ExtensibleValues" */
export type ExtensibleValues_Mutation_Response = {
  __typename?: 'ExtensibleValues_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ExtensibleValues>;
};

/** on conflict condition type for table "ExtensibleValues" */
export type ExtensibleValues_On_Conflict = {
  constraint: ExtensibleValues_Constraint;
  update_columns?: Array<ExtensibleValues_Update_Column>;
  where?: Maybe<ExtensibleValues_Bool_Exp>;
};

/** Ordering options when selecting data from "ExtensibleValues". */
export type ExtensibleValues_Order_By = {
  field?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: ExtensibleValues */
export type ExtensibleValues_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "ExtensibleValues" */
export enum ExtensibleValues_Select_Column {
  /** column name */
  Field = 'field',
  /** column name */
  Id = 'id',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "ExtensibleValues" */
export type ExtensibleValues_Set_Input = {
  field?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "ExtensibleValues" */
export enum ExtensibleValues_Update_Column {
  /** column name */
  Field = 'field',
  /** column name */
  Id = 'id',
  /** column name */
  Value = 'value'
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** columns and relationships of "Inventory" */
export type Inventory = {
  __typename?: 'Inventory';
  /** An object relationship */
  Break?: Maybe<Breaks>;
  /** An object relationship */
  Product: Products;
  break_id?: Maybe<Scalars['uuid']>;
  cost_basis: Scalars['numeric'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  location: Scalars['String'];
  product_id: Scalars['uuid'];
  purchase_date: Scalars['timestamptz'];
  supplier: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "Inventory" */
export type Inventory_Aggregate = {
  __typename?: 'Inventory_aggregate';
  aggregate?: Maybe<Inventory_Aggregate_Fields>;
  nodes: Array<Inventory>;
};

/** aggregate fields of "Inventory" */
export type Inventory_Aggregate_Fields = {
  __typename?: 'Inventory_aggregate_fields';
  avg?: Maybe<Inventory_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Inventory_Max_Fields>;
  min?: Maybe<Inventory_Min_Fields>;
  stddev?: Maybe<Inventory_Stddev_Fields>;
  stddev_pop?: Maybe<Inventory_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Inventory_Stddev_Samp_Fields>;
  sum?: Maybe<Inventory_Sum_Fields>;
  var_pop?: Maybe<Inventory_Var_Pop_Fields>;
  var_samp?: Maybe<Inventory_Var_Samp_Fields>;
  variance?: Maybe<Inventory_Variance_Fields>;
};


/** aggregate fields of "Inventory" */
export type Inventory_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Inventory_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Inventory" */
export type Inventory_Aggregate_Order_By = {
  avg?: Maybe<Inventory_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Inventory_Max_Order_By>;
  min?: Maybe<Inventory_Min_Order_By>;
  stddev?: Maybe<Inventory_Stddev_Order_By>;
  stddev_pop?: Maybe<Inventory_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Inventory_Stddev_Samp_Order_By>;
  sum?: Maybe<Inventory_Sum_Order_By>;
  var_pop?: Maybe<Inventory_Var_Pop_Order_By>;
  var_samp?: Maybe<Inventory_Var_Samp_Order_By>;
  variance?: Maybe<Inventory_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "Inventory" */
export type Inventory_Arr_Rel_Insert_Input = {
  data: Array<Inventory_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Inventory_On_Conflict>;
};

/** aggregate avg on columns */
export type Inventory_Avg_Fields = {
  __typename?: 'Inventory_avg_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Inventory" */
export type Inventory_Avg_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Inventory". All fields are combined with a logical 'AND'. */
export type Inventory_Bool_Exp = {
  Break?: Maybe<Breaks_Bool_Exp>;
  Product?: Maybe<Products_Bool_Exp>;
  _and?: Maybe<Array<Inventory_Bool_Exp>>;
  _not?: Maybe<Inventory_Bool_Exp>;
  _or?: Maybe<Array<Inventory_Bool_Exp>>;
  break_id?: Maybe<Uuid_Comparison_Exp>;
  cost_basis?: Maybe<Numeric_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  location?: Maybe<String_Comparison_Exp>;
  product_id?: Maybe<Uuid_Comparison_Exp>;
  purchase_date?: Maybe<Timestamptz_Comparison_Exp>;
  supplier?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Inventory" */
export enum Inventory_Constraint {
  /** unique or primary key constraint */
  InventoryPkey = 'Inventory_pkey'
}

/** input type for incrementing numeric columns in table "Inventory" */
export type Inventory_Inc_Input = {
  cost_basis?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "Inventory" */
export type Inventory_Insert_Input = {
  Break?: Maybe<Breaks_Obj_Rel_Insert_Input>;
  Product?: Maybe<Products_Obj_Rel_Insert_Input>;
  break_id?: Maybe<Scalars['uuid']>;
  cost_basis?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  location?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['uuid']>;
  purchase_date?: Maybe<Scalars['timestamptz']>;
  supplier?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Inventory_Max_Fields = {
  __typename?: 'Inventory_max_fields';
  break_id?: Maybe<Scalars['uuid']>;
  cost_basis?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  location?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['uuid']>;
  purchase_date?: Maybe<Scalars['timestamptz']>;
  supplier?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "Inventory" */
export type Inventory_Max_Order_By = {
  break_id?: Maybe<Order_By>;
  cost_basis?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
  purchase_date?: Maybe<Order_By>;
  supplier?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Inventory_Min_Fields = {
  __typename?: 'Inventory_min_fields';
  break_id?: Maybe<Scalars['uuid']>;
  cost_basis?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  location?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['uuid']>;
  purchase_date?: Maybe<Scalars['timestamptz']>;
  supplier?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "Inventory" */
export type Inventory_Min_Order_By = {
  break_id?: Maybe<Order_By>;
  cost_basis?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
  purchase_date?: Maybe<Order_By>;
  supplier?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "Inventory" */
export type Inventory_Mutation_Response = {
  __typename?: 'Inventory_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Inventory>;
};

/** on conflict condition type for table "Inventory" */
export type Inventory_On_Conflict = {
  constraint: Inventory_Constraint;
  update_columns?: Array<Inventory_Update_Column>;
  where?: Maybe<Inventory_Bool_Exp>;
};

/** Ordering options when selecting data from "Inventory". */
export type Inventory_Order_By = {
  Break?: Maybe<Breaks_Order_By>;
  Product?: Maybe<Products_Order_By>;
  break_id?: Maybe<Order_By>;
  cost_basis?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  product_id?: Maybe<Order_By>;
  purchase_date?: Maybe<Order_By>;
  supplier?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: Inventory */
export type Inventory_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Inventory" */
export enum Inventory_Select_Column {
  /** column name */
  BreakId = 'break_id',
  /** column name */
  CostBasis = 'cost_basis',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  PurchaseDate = 'purchase_date',
  /** column name */
  Supplier = 'supplier',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "Inventory" */
export type Inventory_Set_Input = {
  break_id?: Maybe<Scalars['uuid']>;
  cost_basis?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  location?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['uuid']>;
  purchase_date?: Maybe<Scalars['timestamptz']>;
  supplier?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Inventory_Stddev_Fields = {
  __typename?: 'Inventory_stddev_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Inventory" */
export type Inventory_Stddev_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Inventory_Stddev_Pop_Fields = {
  __typename?: 'Inventory_stddev_pop_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Inventory" */
export type Inventory_Stddev_Pop_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Inventory_Stddev_Samp_Fields = {
  __typename?: 'Inventory_stddev_samp_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Inventory" */
export type Inventory_Stddev_Samp_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Inventory_Sum_Fields = {
  __typename?: 'Inventory_sum_fields';
  cost_basis?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "Inventory" */
export type Inventory_Sum_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** update columns of table "Inventory" */
export enum Inventory_Update_Column {
  /** column name */
  BreakId = 'break_id',
  /** column name */
  CostBasis = 'cost_basis',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  PurchaseDate = 'purchase_date',
  /** column name */
  Supplier = 'supplier',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Inventory_Var_Pop_Fields = {
  __typename?: 'Inventory_var_pop_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Inventory" */
export type Inventory_Var_Pop_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Inventory_Var_Samp_Fields = {
  __typename?: 'Inventory_var_samp_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Inventory" */
export type Inventory_Var_Samp_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Inventory_Variance_Fields = {
  __typename?: 'Inventory_variance_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Inventory" */
export type Inventory_Variance_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** columns and relationships of "Notifications" */
export type Notifications = {
  __typename?: 'Notifications';
  /** An object relationship */
  User: Users;
  before_15_min: Scalars['Boolean'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['String'];
  when_live: Scalars['Boolean'];
};

/** aggregated selection of "Notifications" */
export type Notifications_Aggregate = {
  __typename?: 'Notifications_aggregate';
  aggregate?: Maybe<Notifications_Aggregate_Fields>;
  nodes: Array<Notifications>;
};

/** aggregate fields of "Notifications" */
export type Notifications_Aggregate_Fields = {
  __typename?: 'Notifications_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Notifications_Max_Fields>;
  min?: Maybe<Notifications_Min_Fields>;
};


/** aggregate fields of "Notifications" */
export type Notifications_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Notifications_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "Notifications". All fields are combined with a logical 'AND'. */
export type Notifications_Bool_Exp = {
  User?: Maybe<Users_Bool_Exp>;
  _and?: Maybe<Array<Notifications_Bool_Exp>>;
  _not?: Maybe<Notifications_Bool_Exp>;
  _or?: Maybe<Array<Notifications_Bool_Exp>>;
  before_15_min?: Maybe<Boolean_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
  when_live?: Maybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "Notifications" */
export enum Notifications_Constraint {
  /** unique or primary key constraint */
  NotificationsPkey = 'Notifications_pkey',
  /** unique or primary key constraint */
  NotificationsUserIdKey = 'Notifications_user_id_key'
}

/** input type for inserting data into table "Notifications" */
export type Notifications_Insert_Input = {
  User?: Maybe<Users_Obj_Rel_Insert_Input>;
  before_15_min?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  when_live?: Maybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Notifications_Max_Fields = {
  __typename?: 'Notifications_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Notifications_Min_Fields = {
  __typename?: 'Notifications_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "Notifications" */
export type Notifications_Mutation_Response = {
  __typename?: 'Notifications_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Notifications>;
};

/** input type for inserting object relation for remote table "Notifications" */
export type Notifications_Obj_Rel_Insert_Input = {
  data: Notifications_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Notifications_On_Conflict>;
};

/** on conflict condition type for table "Notifications" */
export type Notifications_On_Conflict = {
  constraint: Notifications_Constraint;
  update_columns?: Array<Notifications_Update_Column>;
  where?: Maybe<Notifications_Bool_Exp>;
};

/** Ordering options when selecting data from "Notifications". */
export type Notifications_Order_By = {
  User?: Maybe<Users_Order_By>;
  before_15_min?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  when_live?: Maybe<Order_By>;
};

/** primary key columns input for table: Notifications */
export type Notifications_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Notifications" */
export enum Notifications_Select_Column {
  /** column name */
  Before_15Min = 'before_15_min',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WhenLive = 'when_live'
}

/** input type for updating data in table "Notifications" */
export type Notifications_Set_Input = {
  before_15_min?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  when_live?: Maybe<Scalars['Boolean']>;
};

/** update columns of table "Notifications" */
export enum Notifications_Update_Column {
  /** column name */
  Before_15Min = 'before_15_min',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WhenLive = 'when_live'
}

/** columns and relationships of "Orders" */
export type Orders = {
  __typename?: 'Orders';
  /** An array relationship */
  BreakProductItems: Array<BreakProductItems>;
  /** An aggregate relationship */
  BreakProductItems_aggregate: BreakProductItems_Aggregate;
  /** An object relationship */
  User: Users;
  bc_order_id: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  discount_total: Scalars['numeric'];
  grand_total: Scalars['numeric'];
  id: Scalars['uuid'];
  shipping_total: Scalars['numeric'];
  subtotal: Scalars['numeric'];
  tax_total: Scalars['numeric'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['String'];
};


/** columns and relationships of "Orders" */
export type OrdersBreakProductItemsArgs = {
  distinct_on?: Maybe<Array<BreakProductItems_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakProductItems_Order_By>>;
  where?: Maybe<BreakProductItems_Bool_Exp>;
};


/** columns and relationships of "Orders" */
export type OrdersBreakProductItems_AggregateArgs = {
  distinct_on?: Maybe<Array<BreakProductItems_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakProductItems_Order_By>>;
  where?: Maybe<BreakProductItems_Bool_Exp>;
};

/** aggregated selection of "Orders" */
export type Orders_Aggregate = {
  __typename?: 'Orders_aggregate';
  aggregate?: Maybe<Orders_Aggregate_Fields>;
  nodes: Array<Orders>;
};

/** aggregate fields of "Orders" */
export type Orders_Aggregate_Fields = {
  __typename?: 'Orders_aggregate_fields';
  avg?: Maybe<Orders_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Orders_Max_Fields>;
  min?: Maybe<Orders_Min_Fields>;
  stddev?: Maybe<Orders_Stddev_Fields>;
  stddev_pop?: Maybe<Orders_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Orders_Stddev_Samp_Fields>;
  sum?: Maybe<Orders_Sum_Fields>;
  var_pop?: Maybe<Orders_Var_Pop_Fields>;
  var_samp?: Maybe<Orders_Var_Samp_Fields>;
  variance?: Maybe<Orders_Variance_Fields>;
};


/** aggregate fields of "Orders" */
export type Orders_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Orders_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Orders" */
export type Orders_Aggregate_Order_By = {
  avg?: Maybe<Orders_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Orders_Max_Order_By>;
  min?: Maybe<Orders_Min_Order_By>;
  stddev?: Maybe<Orders_Stddev_Order_By>;
  stddev_pop?: Maybe<Orders_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Orders_Stddev_Samp_Order_By>;
  sum?: Maybe<Orders_Sum_Order_By>;
  var_pop?: Maybe<Orders_Var_Pop_Order_By>;
  var_samp?: Maybe<Orders_Var_Samp_Order_By>;
  variance?: Maybe<Orders_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "Orders" */
export type Orders_Arr_Rel_Insert_Input = {
  data: Array<Orders_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Orders_On_Conflict>;
};

/** aggregate avg on columns */
export type Orders_Avg_Fields = {
  __typename?: 'Orders_avg_fields';
  bc_order_id?: Maybe<Scalars['Float']>;
  discount_total?: Maybe<Scalars['Float']>;
  grand_total?: Maybe<Scalars['Float']>;
  shipping_total?: Maybe<Scalars['Float']>;
  subtotal?: Maybe<Scalars['Float']>;
  tax_total?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Orders" */
export type Orders_Avg_Order_By = {
  bc_order_id?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Orders". All fields are combined with a logical 'AND'. */
export type Orders_Bool_Exp = {
  BreakProductItems?: Maybe<BreakProductItems_Bool_Exp>;
  User?: Maybe<Users_Bool_Exp>;
  _and?: Maybe<Array<Orders_Bool_Exp>>;
  _not?: Maybe<Orders_Bool_Exp>;
  _or?: Maybe<Array<Orders_Bool_Exp>>;
  bc_order_id?: Maybe<Int_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  discount_total?: Maybe<Numeric_Comparison_Exp>;
  grand_total?: Maybe<Numeric_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  shipping_total?: Maybe<Numeric_Comparison_Exp>;
  subtotal?: Maybe<Numeric_Comparison_Exp>;
  tax_total?: Maybe<Numeric_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Orders" */
export enum Orders_Constraint {
  /** unique or primary key constraint */
  OrdersPkey = 'Orders_pkey'
}

/** input type for incrementing numeric columns in table "Orders" */
export type Orders_Inc_Input = {
  bc_order_id?: Maybe<Scalars['Int']>;
  discount_total?: Maybe<Scalars['numeric']>;
  grand_total?: Maybe<Scalars['numeric']>;
  shipping_total?: Maybe<Scalars['numeric']>;
  subtotal?: Maybe<Scalars['numeric']>;
  tax_total?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "Orders" */
export type Orders_Insert_Input = {
  BreakProductItems?: Maybe<BreakProductItems_Arr_Rel_Insert_Input>;
  User?: Maybe<Users_Obj_Rel_Insert_Input>;
  bc_order_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_total?: Maybe<Scalars['numeric']>;
  grand_total?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  shipping_total?: Maybe<Scalars['numeric']>;
  subtotal?: Maybe<Scalars['numeric']>;
  tax_total?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Orders_Max_Fields = {
  __typename?: 'Orders_max_fields';
  bc_order_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_total?: Maybe<Scalars['numeric']>;
  grand_total?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  shipping_total?: Maybe<Scalars['numeric']>;
  subtotal?: Maybe<Scalars['numeric']>;
  tax_total?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Orders" */
export type Orders_Max_Order_By = {
  bc_order_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Orders_Min_Fields = {
  __typename?: 'Orders_min_fields';
  bc_order_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_total?: Maybe<Scalars['numeric']>;
  grand_total?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  shipping_total?: Maybe<Scalars['numeric']>;
  subtotal?: Maybe<Scalars['numeric']>;
  tax_total?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Orders" */
export type Orders_Min_Order_By = {
  bc_order_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "Orders" */
export type Orders_Mutation_Response = {
  __typename?: 'Orders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Orders>;
};

/** input type for inserting object relation for remote table "Orders" */
export type Orders_Obj_Rel_Insert_Input = {
  data: Orders_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Orders_On_Conflict>;
};

/** on conflict condition type for table "Orders" */
export type Orders_On_Conflict = {
  constraint: Orders_Constraint;
  update_columns?: Array<Orders_Update_Column>;
  where?: Maybe<Orders_Bool_Exp>;
};

/** Ordering options when selecting data from "Orders". */
export type Orders_Order_By = {
  BreakProductItems_aggregate?: Maybe<BreakProductItems_Aggregate_Order_By>;
  User?: Maybe<Users_Order_By>;
  bc_order_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: Orders */
export type Orders_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Orders" */
export enum Orders_Select_Column {
  /** column name */
  BcOrderId = 'bc_order_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscountTotal = 'discount_total',
  /** column name */
  GrandTotal = 'grand_total',
  /** column name */
  Id = 'id',
  /** column name */
  ShippingTotal = 'shipping_total',
  /** column name */
  Subtotal = 'subtotal',
  /** column name */
  TaxTotal = 'tax_total',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "Orders" */
export type Orders_Set_Input = {
  bc_order_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  discount_total?: Maybe<Scalars['numeric']>;
  grand_total?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  shipping_total?: Maybe<Scalars['numeric']>;
  subtotal?: Maybe<Scalars['numeric']>;
  tax_total?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Orders_Stddev_Fields = {
  __typename?: 'Orders_stddev_fields';
  bc_order_id?: Maybe<Scalars['Float']>;
  discount_total?: Maybe<Scalars['Float']>;
  grand_total?: Maybe<Scalars['Float']>;
  shipping_total?: Maybe<Scalars['Float']>;
  subtotal?: Maybe<Scalars['Float']>;
  tax_total?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Orders" */
export type Orders_Stddev_Order_By = {
  bc_order_id?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Orders_Stddev_Pop_Fields = {
  __typename?: 'Orders_stddev_pop_fields';
  bc_order_id?: Maybe<Scalars['Float']>;
  discount_total?: Maybe<Scalars['Float']>;
  grand_total?: Maybe<Scalars['Float']>;
  shipping_total?: Maybe<Scalars['Float']>;
  subtotal?: Maybe<Scalars['Float']>;
  tax_total?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Orders" */
export type Orders_Stddev_Pop_Order_By = {
  bc_order_id?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Orders_Stddev_Samp_Fields = {
  __typename?: 'Orders_stddev_samp_fields';
  bc_order_id?: Maybe<Scalars['Float']>;
  discount_total?: Maybe<Scalars['Float']>;
  grand_total?: Maybe<Scalars['Float']>;
  shipping_total?: Maybe<Scalars['Float']>;
  subtotal?: Maybe<Scalars['Float']>;
  tax_total?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Orders" */
export type Orders_Stddev_Samp_Order_By = {
  bc_order_id?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Orders_Sum_Fields = {
  __typename?: 'Orders_sum_fields';
  bc_order_id?: Maybe<Scalars['Int']>;
  discount_total?: Maybe<Scalars['numeric']>;
  grand_total?: Maybe<Scalars['numeric']>;
  shipping_total?: Maybe<Scalars['numeric']>;
  subtotal?: Maybe<Scalars['numeric']>;
  tax_total?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "Orders" */
export type Orders_Sum_Order_By = {
  bc_order_id?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
};

/** update columns of table "Orders" */
export enum Orders_Update_Column {
  /** column name */
  BcOrderId = 'bc_order_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscountTotal = 'discount_total',
  /** column name */
  GrandTotal = 'grand_total',
  /** column name */
  Id = 'id',
  /** column name */
  ShippingTotal = 'shipping_total',
  /** column name */
  Subtotal = 'subtotal',
  /** column name */
  TaxTotal = 'tax_total',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Orders_Var_Pop_Fields = {
  __typename?: 'Orders_var_pop_fields';
  bc_order_id?: Maybe<Scalars['Float']>;
  discount_total?: Maybe<Scalars['Float']>;
  grand_total?: Maybe<Scalars['Float']>;
  shipping_total?: Maybe<Scalars['Float']>;
  subtotal?: Maybe<Scalars['Float']>;
  tax_total?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Orders" */
export type Orders_Var_Pop_Order_By = {
  bc_order_id?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Orders_Var_Samp_Fields = {
  __typename?: 'Orders_var_samp_fields';
  bc_order_id?: Maybe<Scalars['Float']>;
  discount_total?: Maybe<Scalars['Float']>;
  grand_total?: Maybe<Scalars['Float']>;
  shipping_total?: Maybe<Scalars['Float']>;
  subtotal?: Maybe<Scalars['Float']>;
  tax_total?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Orders" */
export type Orders_Var_Samp_Order_By = {
  bc_order_id?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Orders_Variance_Fields = {
  __typename?: 'Orders_variance_fields';
  bc_order_id?: Maybe<Scalars['Float']>;
  discount_total?: Maybe<Scalars['Float']>;
  grand_total?: Maybe<Scalars['Float']>;
  shipping_total?: Maybe<Scalars['Float']>;
  subtotal?: Maybe<Scalars['Float']>;
  tax_total?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Orders" */
export type Orders_Variance_Order_By = {
  bc_order_id?: Maybe<Order_By>;
  discount_total?: Maybe<Order_By>;
  grand_total?: Maybe<Order_By>;
  shipping_total?: Maybe<Order_By>;
  subtotal?: Maybe<Order_By>;
  tax_total?: Maybe<Order_By>;
};

/** columns and relationships of "Products" */
export type Products = {
  __typename?: 'Products';
  /** An array relationship */
  Inventory: Array<Inventory>;
  /** An aggregate relationship */
  Inventory_aggregate: Inventory_Aggregate;
  autograph?: Maybe<Scalars['Boolean']>;
  available: Scalars['Boolean'];
  boxes_per_case?: Maybe<Scalars['Int']>;
  brand: Scalars['String'];
  card_number?: Maybe<Scalars['String']>;
  cards_per_pack?: Maybe<Scalars['Int']>;
  category: Scalars['String'];
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['numeric']>;
  grader?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  image: Scalars['String'];
  insert?: Maybe<Scalars['String']>;
  manufacturer: Scalars['String'];
  memoribillia?: Maybe<Scalars['String']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  paralell?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['String']>;
  rookie_card?: Maybe<Scalars['Boolean']>;
  series?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** An object relationship */
  unit: Unit_Of_Measure;
  unit_of_measure: Unit_Of_Measure_Enum;
  updated_at: Scalars['timestamptz'];
  year: Scalars['String'];
};


/** columns and relationships of "Products" */
export type ProductsInventoryArgs = {
  distinct_on?: Maybe<Array<Inventory_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Inventory_Order_By>>;
  where?: Maybe<Inventory_Bool_Exp>;
};


/** columns and relationships of "Products" */
export type ProductsInventory_AggregateArgs = {
  distinct_on?: Maybe<Array<Inventory_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Inventory_Order_By>>;
  where?: Maybe<Inventory_Bool_Exp>;
};

/** aggregated selection of "Products" */
export type Products_Aggregate = {
  __typename?: 'Products_aggregate';
  aggregate?: Maybe<Products_Aggregate_Fields>;
  nodes: Array<Products>;
};

/** aggregate fields of "Products" */
export type Products_Aggregate_Fields = {
  __typename?: 'Products_aggregate_fields';
  avg?: Maybe<Products_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Products_Max_Fields>;
  min?: Maybe<Products_Min_Fields>;
  stddev?: Maybe<Products_Stddev_Fields>;
  stddev_pop?: Maybe<Products_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Products_Stddev_Samp_Fields>;
  sum?: Maybe<Products_Sum_Fields>;
  var_pop?: Maybe<Products_Var_Pop_Fields>;
  var_samp?: Maybe<Products_Var_Samp_Fields>;
  variance?: Maybe<Products_Variance_Fields>;
};


/** aggregate fields of "Products" */
export type Products_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Products_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Products" */
export type Products_Aggregate_Order_By = {
  avg?: Maybe<Products_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Products_Max_Order_By>;
  min?: Maybe<Products_Min_Order_By>;
  stddev?: Maybe<Products_Stddev_Order_By>;
  stddev_pop?: Maybe<Products_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Products_Stddev_Samp_Order_By>;
  sum?: Maybe<Products_Sum_Order_By>;
  var_pop?: Maybe<Products_Var_Pop_Order_By>;
  var_samp?: Maybe<Products_Var_Samp_Order_By>;
  variance?: Maybe<Products_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "Products" */
export type Products_Arr_Rel_Insert_Input = {
  data: Array<Products_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Products_On_Conflict>;
};

/** aggregate avg on columns */
export type Products_Avg_Fields = {
  __typename?: 'Products_avg_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Products" */
export type Products_Avg_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  Inventory?: Maybe<Inventory_Bool_Exp>;
  _and?: Maybe<Array<Products_Bool_Exp>>;
  _not?: Maybe<Products_Bool_Exp>;
  _or?: Maybe<Array<Products_Bool_Exp>>;
  autograph?: Maybe<Boolean_Comparison_Exp>;
  available?: Maybe<Boolean_Comparison_Exp>;
  boxes_per_case?: Maybe<Int_Comparison_Exp>;
  brand?: Maybe<String_Comparison_Exp>;
  card_number?: Maybe<String_Comparison_Exp>;
  cards_per_pack?: Maybe<Int_Comparison_Exp>;
  category?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  grade?: Maybe<Numeric_Comparison_Exp>;
  grader?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  insert?: Maybe<String_Comparison_Exp>;
  manufacturer?: Maybe<String_Comparison_Exp>;
  memoribillia?: Maybe<String_Comparison_Exp>;
  numbered?: Maybe<Int_Comparison_Exp>;
  packs_per_box?: Maybe<Int_Comparison_Exp>;
  paralell?: Maybe<String_Comparison_Exp>;
  player?: Maybe<String_Comparison_Exp>;
  rookie_card?: Maybe<Boolean_Comparison_Exp>;
  series?: Maybe<String_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
  unit?: Maybe<Unit_Of_Measure_Bool_Exp>;
  unit_of_measure?: Maybe<Unit_Of_Measure_Enum_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  year?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Products" */
export enum Products_Constraint {
  /** unique or primary key constraint */
  ProductsPkey = 'Products_pkey'
}

/** input type for incrementing numeric columns in table "Products" */
export type Products_Inc_Input = {
  boxes_per_case?: Maybe<Scalars['Int']>;
  cards_per_pack?: Maybe<Scalars['Int']>;
  grade?: Maybe<Scalars['numeric']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "Products" */
export type Products_Insert_Input = {
  Inventory?: Maybe<Inventory_Arr_Rel_Insert_Input>;
  autograph?: Maybe<Scalars['Boolean']>;
  available?: Maybe<Scalars['Boolean']>;
  boxes_per_case?: Maybe<Scalars['Int']>;
  brand?: Maybe<Scalars['String']>;
  card_number?: Maybe<Scalars['String']>;
  cards_per_pack?: Maybe<Scalars['Int']>;
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['numeric']>;
  grader?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  insert?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  memoribillia?: Maybe<Scalars['String']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  paralell?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['String']>;
  rookie_card?: Maybe<Scalars['Boolean']>;
  series?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  unit?: Maybe<Unit_Of_Measure_Obj_Rel_Insert_Input>;
  unit_of_measure?: Maybe<Unit_Of_Measure_Enum>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  year?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Products_Max_Fields = {
  __typename?: 'Products_max_fields';
  boxes_per_case?: Maybe<Scalars['Int']>;
  brand?: Maybe<Scalars['String']>;
  card_number?: Maybe<Scalars['String']>;
  cards_per_pack?: Maybe<Scalars['Int']>;
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['numeric']>;
  grader?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  insert?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  memoribillia?: Maybe<Scalars['String']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  paralell?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['String']>;
  series?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  year?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Products" */
export type Products_Max_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  brand?: Maybe<Order_By>;
  card_number?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  category?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  grader?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  insert?: Maybe<Order_By>;
  manufacturer?: Maybe<Order_By>;
  memoribillia?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  paralell?: Maybe<Order_By>;
  player?: Maybe<Order_By>;
  series?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Products_Min_Fields = {
  __typename?: 'Products_min_fields';
  boxes_per_case?: Maybe<Scalars['Int']>;
  brand?: Maybe<Scalars['String']>;
  card_number?: Maybe<Scalars['String']>;
  cards_per_pack?: Maybe<Scalars['Int']>;
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['numeric']>;
  grader?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  insert?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  memoribillia?: Maybe<Scalars['String']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  paralell?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['String']>;
  series?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  year?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Products" */
export type Products_Min_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  brand?: Maybe<Order_By>;
  card_number?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  category?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  grader?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  insert?: Maybe<Order_By>;
  manufacturer?: Maybe<Order_By>;
  memoribillia?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  paralell?: Maybe<Order_By>;
  player?: Maybe<Order_By>;
  series?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

/** response of any mutation on the table "Products" */
export type Products_Mutation_Response = {
  __typename?: 'Products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Products>;
};

/** input type for inserting object relation for remote table "Products" */
export type Products_Obj_Rel_Insert_Input = {
  data: Products_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Products_On_Conflict>;
};

/** on conflict condition type for table "Products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns?: Array<Products_Update_Column>;
  where?: Maybe<Products_Bool_Exp>;
};

/** Ordering options when selecting data from "Products". */
export type Products_Order_By = {
  Inventory_aggregate?: Maybe<Inventory_Aggregate_Order_By>;
  autograph?: Maybe<Order_By>;
  available?: Maybe<Order_By>;
  boxes_per_case?: Maybe<Order_By>;
  brand?: Maybe<Order_By>;
  card_number?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  category?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  grader?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  insert?: Maybe<Order_By>;
  manufacturer?: Maybe<Order_By>;
  memoribillia?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  paralell?: Maybe<Order_By>;
  player?: Maybe<Order_By>;
  rookie_card?: Maybe<Order_By>;
  series?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  unit?: Maybe<Unit_Of_Measure_Order_By>;
  unit_of_measure?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

/** primary key columns input for table: Products */
export type Products_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Products" */
export enum Products_Select_Column {
  /** column name */
  Autograph = 'autograph',
  /** column name */
  Available = 'available',
  /** column name */
  BoxesPerCase = 'boxes_per_case',
  /** column name */
  Brand = 'brand',
  /** column name */
  CardNumber = 'card_number',
  /** column name */
  CardsPerPack = 'cards_per_pack',
  /** column name */
  Category = 'category',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Grade = 'grade',
  /** column name */
  Grader = 'grader',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Insert = 'insert',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  Memoribillia = 'memoribillia',
  /** column name */
  Numbered = 'numbered',
  /** column name */
  PacksPerBox = 'packs_per_box',
  /** column name */
  Paralell = 'paralell',
  /** column name */
  Player = 'player',
  /** column name */
  RookieCard = 'rookie_card',
  /** column name */
  Series = 'series',
  /** column name */
  Type = 'type',
  /** column name */
  UnitOfMeasure = 'unit_of_measure',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Year = 'year'
}

/** input type for updating data in table "Products" */
export type Products_Set_Input = {
  autograph?: Maybe<Scalars['Boolean']>;
  available?: Maybe<Scalars['Boolean']>;
  boxes_per_case?: Maybe<Scalars['Int']>;
  brand?: Maybe<Scalars['String']>;
  card_number?: Maybe<Scalars['String']>;
  cards_per_pack?: Maybe<Scalars['Int']>;
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['numeric']>;
  grader?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  insert?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  memoribillia?: Maybe<Scalars['String']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  paralell?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['String']>;
  rookie_card?: Maybe<Scalars['Boolean']>;
  series?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  unit_of_measure?: Maybe<Unit_Of_Measure_Enum>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  year?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Products_Stddev_Fields = {
  __typename?: 'Products_stddev_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Products" */
export type Products_Stddev_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Products_Stddev_Pop_Fields = {
  __typename?: 'Products_stddev_pop_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Products" */
export type Products_Stddev_Pop_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Products_Stddev_Samp_Fields = {
  __typename?: 'Products_stddev_samp_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Products" */
export type Products_Stddev_Samp_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Products_Sum_Fields = {
  __typename?: 'Products_sum_fields';
  boxes_per_case?: Maybe<Scalars['Int']>;
  cards_per_pack?: Maybe<Scalars['Int']>;
  grade?: Maybe<Scalars['numeric']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Products" */
export type Products_Sum_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
};

/** update columns of table "Products" */
export enum Products_Update_Column {
  /** column name */
  Autograph = 'autograph',
  /** column name */
  Available = 'available',
  /** column name */
  BoxesPerCase = 'boxes_per_case',
  /** column name */
  Brand = 'brand',
  /** column name */
  CardNumber = 'card_number',
  /** column name */
  CardsPerPack = 'cards_per_pack',
  /** column name */
  Category = 'category',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Grade = 'grade',
  /** column name */
  Grader = 'grader',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Insert = 'insert',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  Memoribillia = 'memoribillia',
  /** column name */
  Numbered = 'numbered',
  /** column name */
  PacksPerBox = 'packs_per_box',
  /** column name */
  Paralell = 'paralell',
  /** column name */
  Player = 'player',
  /** column name */
  RookieCard = 'rookie_card',
  /** column name */
  Series = 'series',
  /** column name */
  Type = 'type',
  /** column name */
  UnitOfMeasure = 'unit_of_measure',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Year = 'year'
}

/** aggregate var_pop on columns */
export type Products_Var_Pop_Fields = {
  __typename?: 'Products_var_pop_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Products" */
export type Products_Var_Pop_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Products_Var_Samp_Fields = {
  __typename?: 'Products_var_samp_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Products" */
export type Products_Var_Samp_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Products_Variance_Fields = {
  __typename?: 'Products_variance_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Products" */
export type Products_Variance_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "UserPreferences" */
export type UserPreferences = {
  __typename?: 'UserPreferences';
  /** An object relationship */
  User: Users;
  break_type: Scalars['_text'];
  created_at: Scalars['timestamptz'];
  frequency: Scalars['String'];
  id: Scalars['uuid'];
  pricing: Scalars['_text'];
  sports: Scalars['_text'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['String'];
};

/** aggregated selection of "UserPreferences" */
export type UserPreferences_Aggregate = {
  __typename?: 'UserPreferences_aggregate';
  aggregate?: Maybe<UserPreferences_Aggregate_Fields>;
  nodes: Array<UserPreferences>;
};

/** aggregate fields of "UserPreferences" */
export type UserPreferences_Aggregate_Fields = {
  __typename?: 'UserPreferences_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<UserPreferences_Max_Fields>;
  min?: Maybe<UserPreferences_Min_Fields>;
};


/** aggregate fields of "UserPreferences" */
export type UserPreferences_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<UserPreferences_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "UserPreferences". All fields are combined with a logical 'AND'. */
export type UserPreferences_Bool_Exp = {
  User?: Maybe<Users_Bool_Exp>;
  _and?: Maybe<Array<UserPreferences_Bool_Exp>>;
  _not?: Maybe<UserPreferences_Bool_Exp>;
  _or?: Maybe<Array<UserPreferences_Bool_Exp>>;
  break_type?: Maybe<_Text_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  frequency?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  pricing?: Maybe<_Text_Comparison_Exp>;
  sports?: Maybe<_Text_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "UserPreferences" */
export enum UserPreferences_Constraint {
  /** unique or primary key constraint */
  UserPreferencesPkey = 'UserPreferences_pkey',
  /** unique or primary key constraint */
  UserPreferencesUserIdKey = 'UserPreferences_user_id_key'
}

/** input type for inserting data into table "UserPreferences" */
export type UserPreferences_Insert_Input = {
  User?: Maybe<Users_Obj_Rel_Insert_Input>;
  break_type?: Maybe<Scalars['_text']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  frequency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  pricing?: Maybe<Scalars['_text']>;
  sports?: Maybe<Scalars['_text']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type UserPreferences_Max_Fields = {
  __typename?: 'UserPreferences_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  frequency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type UserPreferences_Min_Fields = {
  __typename?: 'UserPreferences_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  frequency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "UserPreferences" */
export type UserPreferences_Mutation_Response = {
  __typename?: 'UserPreferences_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<UserPreferences>;
};

/** input type for inserting object relation for remote table "UserPreferences" */
export type UserPreferences_Obj_Rel_Insert_Input = {
  data: UserPreferences_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<UserPreferences_On_Conflict>;
};

/** on conflict condition type for table "UserPreferences" */
export type UserPreferences_On_Conflict = {
  constraint: UserPreferences_Constraint;
  update_columns?: Array<UserPreferences_Update_Column>;
  where?: Maybe<UserPreferences_Bool_Exp>;
};

/** Ordering options when selecting data from "UserPreferences". */
export type UserPreferences_Order_By = {
  User?: Maybe<Users_Order_By>;
  break_type?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  frequency?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  pricing?: Maybe<Order_By>;
  sports?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: UserPreferences */
export type UserPreferences_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "UserPreferences" */
export enum UserPreferences_Select_Column {
  /** column name */
  BreakType = 'break_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Frequency = 'frequency',
  /** column name */
  Id = 'id',
  /** column name */
  Pricing = 'pricing',
  /** column name */
  Sports = 'sports',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "UserPreferences" */
export type UserPreferences_Set_Input = {
  break_type?: Maybe<Scalars['_text']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  frequency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  pricing?: Maybe<Scalars['_text']>;
  sports?: Maybe<Scalars['_text']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "UserPreferences" */
export enum UserPreferences_Update_Column {
  /** column name */
  BreakType = 'break_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Frequency = 'frequency',
  /** column name */
  Id = 'id',
  /** column name */
  Pricing = 'pricing',
  /** column name */
  Sports = 'sports',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "Users" */
export type Users = {
  __typename?: 'Users';
  /** An array relationship */
  Addresses: Array<Addresses>;
  /** An aggregate relationship */
  Addresses_aggregate: Addresses_Aggregate;
  /** An object relationship */
  BreakerProfile: BreakerProfiles;
  /** An array relationship */
  Events: Array<Events>;
  /** An aggregate relationship */
  Events_aggregate: Events_Aggregate;
  /** An object relationship */
  Notification: Notifications;
  /** fetch data from the table: "Orders" */
  Orders: Array<Orders>;
  /** An aggregate relationship */
  Orders_aggregate: Orders_Aggregate;
  /** An object relationship */
  UserPreference: UserPreferences;
  created_at: Scalars['timestamptz'];
  first_name: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  is_breaker: Scalars['Boolean'];
  last_name: Scalars['String'];
  role: User_Role_Enum;
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user_role: User_Role;
  username?: Maybe<Scalars['String']>;
};


/** columns and relationships of "Users" */
export type UsersAddressesArgs = {
  distinct_on?: Maybe<Array<Addresses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Addresses_Order_By>>;
  where?: Maybe<Addresses_Bool_Exp>;
};


/** columns and relationships of "Users" */
export type UsersAddresses_AggregateArgs = {
  distinct_on?: Maybe<Array<Addresses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Addresses_Order_By>>;
  where?: Maybe<Addresses_Bool_Exp>;
};


/** columns and relationships of "Users" */
export type UsersEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


/** columns and relationships of "Users" */
export type UsersEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


/** columns and relationships of "Users" */
export type UsersOrdersArgs = {
  distinct_on?: Maybe<Array<Orders_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Order_By>>;
  where?: Maybe<Orders_Bool_Exp>;
};


/** columns and relationships of "Users" */
export type UsersOrders_AggregateArgs = {
  distinct_on?: Maybe<Array<Orders_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Order_By>>;
  where?: Maybe<Orders_Bool_Exp>;
};

/** aggregated selection of "Users" */
export type Users_Aggregate = {
  __typename?: 'Users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "Users" */
export type Users_Aggregate_Fields = {
  __typename?: 'Users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "Users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  Addresses?: Maybe<Addresses_Bool_Exp>;
  BreakerProfile?: Maybe<BreakerProfiles_Bool_Exp>;
  Events?: Maybe<Events_Bool_Exp>;
  Notification?: Maybe<Notifications_Bool_Exp>;
  Orders?: Maybe<Orders_Bool_Exp>;
  UserPreference?: Maybe<UserPreferences_Bool_Exp>;
  _and?: Maybe<Array<Users_Bool_Exp>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Users_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  first_name?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  is_breaker?: Maybe<Boolean_Comparison_Exp>;
  last_name?: Maybe<String_Comparison_Exp>;
  role?: Maybe<User_Role_Enum_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_role?: Maybe<User_Role_Bool_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'Users_pkey',
  /** unique or primary key constraint */
  UsersUsernameKey = 'Users_username_key'
}

/** input type for inserting data into table "Users" */
export type Users_Insert_Input = {
  Addresses?: Maybe<Addresses_Arr_Rel_Insert_Input>;
  BreakerProfile?: Maybe<BreakerProfiles_Obj_Rel_Insert_Input>;
  Events?: Maybe<Events_Arr_Rel_Insert_Input>;
  Notification?: Maybe<Notifications_Obj_Rel_Insert_Input>;
  Orders?: Maybe<Orders_Arr_Rel_Insert_Input>;
  UserPreference?: Maybe<UserPreferences_Obj_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  is_breaker?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  role?: Maybe<User_Role_Enum>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_role?: Maybe<User_Role_Obj_Rel_Insert_Input>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'Users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Users" */
export type Users_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'Users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Users" */
export type Users_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** response of any mutation on the table "Users" */
export type Users_Mutation_Response = {
  __typename?: 'Users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "Users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "Users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "Users". */
export type Users_Order_By = {
  Addresses_aggregate?: Maybe<Addresses_Aggregate_Order_By>;
  BreakerProfile?: Maybe<BreakerProfiles_Order_By>;
  Events_aggregate?: Maybe<Events_Aggregate_Order_By>;
  Notification?: Maybe<Notifications_Order_By>;
  Orders_aggregate?: Maybe<Orders_Aggregate_Order_By>;
  UserPreference?: Maybe<UserPreferences_Order_By>;
  created_at?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  is_breaker?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  role?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_role?: Maybe<User_Role_Order_By>;
  username?: Maybe<Order_By>;
};

/** primary key columns input for table: Users */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "Users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  IsBreaker = 'is_breaker',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "Users" */
export type Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  is_breaker?: Maybe<Scalars['Boolean']>;
  last_name?: Maybe<Scalars['String']>;
  role?: Maybe<User_Role_Enum>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** update columns of table "Users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  IsBreaker = 'is_breaker',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username'
}


/** Boolean expression to compare columns of type "_text". All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: Maybe<Scalars['_text']>;
  _gt?: Maybe<Scalars['_text']>;
  _gte?: Maybe<Scalars['_text']>;
  _in?: Maybe<Array<Scalars['_text']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['_text']>;
  _lte?: Maybe<Scalars['_text']>;
  _neq?: Maybe<Scalars['_text']>;
  _nin?: Maybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "break_status" */
export type Break_Status = {
  __typename?: 'break_status';
  /** An array relationship */
  Breaks: Array<Breaks>;
  /** An aggregate relationship */
  Breaks_aggregate: Breaks_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "break_status" */
export type Break_StatusBreaksArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};


/** columns and relationships of "break_status" */
export type Break_StatusBreaks_AggregateArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};

/** aggregated selection of "break_status" */
export type Break_Status_Aggregate = {
  __typename?: 'break_status_aggregate';
  aggregate?: Maybe<Break_Status_Aggregate_Fields>;
  nodes: Array<Break_Status>;
};

/** aggregate fields of "break_status" */
export type Break_Status_Aggregate_Fields = {
  __typename?: 'break_status_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Break_Status_Max_Fields>;
  min?: Maybe<Break_Status_Min_Fields>;
};


/** aggregate fields of "break_status" */
export type Break_Status_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Break_Status_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "break_status". All fields are combined with a logical 'AND'. */
export type Break_Status_Bool_Exp = {
  Breaks?: Maybe<Breaks_Bool_Exp>;
  _and?: Maybe<Array<Break_Status_Bool_Exp>>;
  _not?: Maybe<Break_Status_Bool_Exp>;
  _or?: Maybe<Array<Break_Status_Bool_Exp>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "break_status" */
export enum Break_Status_Constraint {
  /** unique or primary key constraint */
  BreakStatusPkey = 'break_status_pkey'
}

export enum Break_Status_Enum {
  Available = 'AVAILABLE',
  Completed = 'COMPLETED',
  Draft = 'DRAFT',
  Live = 'LIVE',
  Soldout = 'SOLDOUT'
}

/** Boolean expression to compare columns of type "break_status_enum". All fields are combined with logical 'AND'. */
export type Break_Status_Enum_Comparison_Exp = {
  _eq?: Maybe<Break_Status_Enum>;
  _in?: Maybe<Array<Break_Status_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Break_Status_Enum>;
  _nin?: Maybe<Array<Break_Status_Enum>>;
};

/** input type for inserting data into table "break_status" */
export type Break_Status_Insert_Input = {
  Breaks?: Maybe<Breaks_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Break_Status_Max_Fields = {
  __typename?: 'break_status_max_fields';
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Break_Status_Min_Fields = {
  __typename?: 'break_status_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "break_status" */
export type Break_Status_Mutation_Response = {
  __typename?: 'break_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Break_Status>;
};

/** input type for inserting object relation for remote table "break_status" */
export type Break_Status_Obj_Rel_Insert_Input = {
  data: Break_Status_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Break_Status_On_Conflict>;
};

/** on conflict condition type for table "break_status" */
export type Break_Status_On_Conflict = {
  constraint: Break_Status_Constraint;
  update_columns?: Array<Break_Status_Update_Column>;
  where?: Maybe<Break_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "break_status". */
export type Break_Status_Order_By = {
  Breaks_aggregate?: Maybe<Breaks_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: break_status */
export type Break_Status_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "break_status" */
export enum Break_Status_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "break_status" */
export type Break_Status_Set_Input = {
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "break_status" */
export enum Break_Status_Update_Column {
  /** column name */
  Value = 'value'
}

/** columns and relationships of "break_type" */
export type Break_Type = {
  __typename?: 'break_type';
  /** An array relationship */
  Breaks: Array<Breaks>;
  /** An aggregate relationship */
  Breaks_aggregate: Breaks_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "break_type" */
export type Break_TypeBreaksArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};


/** columns and relationships of "break_type" */
export type Break_TypeBreaks_AggregateArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};

/** aggregated selection of "break_type" */
export type Break_Type_Aggregate = {
  __typename?: 'break_type_aggregate';
  aggregate?: Maybe<Break_Type_Aggregate_Fields>;
  nodes: Array<Break_Type>;
};

/** aggregate fields of "break_type" */
export type Break_Type_Aggregate_Fields = {
  __typename?: 'break_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Break_Type_Max_Fields>;
  min?: Maybe<Break_Type_Min_Fields>;
};


/** aggregate fields of "break_type" */
export type Break_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Break_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "break_type". All fields are combined with a logical 'AND'. */
export type Break_Type_Bool_Exp = {
  Breaks?: Maybe<Breaks_Bool_Exp>;
  _and?: Maybe<Array<Break_Type_Bool_Exp>>;
  _not?: Maybe<Break_Type_Bool_Exp>;
  _or?: Maybe<Array<Break_Type_Bool_Exp>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "break_type" */
export enum Break_Type_Constraint {
  /** unique or primary key constraint */
  BreakTypePkey = 'break_type_pkey'
}

export enum Break_Type_Enum {
  HitDraft = 'HIT_DRAFT',
  Personal = 'PERSONAL',
  PickYourDivision = 'PICK_YOUR_DIVISION',
  PickYourTeam = 'PICK_YOUR_TEAM',
  RandomDivision = 'RANDOM_DIVISION',
  RandomTeam = 'RANDOM_TEAM'
}

/** Boolean expression to compare columns of type "break_type_enum". All fields are combined with logical 'AND'. */
export type Break_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Break_Type_Enum>;
  _in?: Maybe<Array<Break_Type_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Break_Type_Enum>;
  _nin?: Maybe<Array<Break_Type_Enum>>;
};

/** input type for inserting data into table "break_type" */
export type Break_Type_Insert_Input = {
  Breaks?: Maybe<Breaks_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Break_Type_Max_Fields = {
  __typename?: 'break_type_max_fields';
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Break_Type_Min_Fields = {
  __typename?: 'break_type_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "break_type" */
export type Break_Type_Mutation_Response = {
  __typename?: 'break_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Break_Type>;
};

/** input type for inserting object relation for remote table "break_type" */
export type Break_Type_Obj_Rel_Insert_Input = {
  data: Break_Type_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Break_Type_On_Conflict>;
};

/** on conflict condition type for table "break_type" */
export type Break_Type_On_Conflict = {
  constraint: Break_Type_Constraint;
  update_columns?: Array<Break_Type_Update_Column>;
  where?: Maybe<Break_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "break_type". */
export type Break_Type_Order_By = {
  Breaks_aggregate?: Maybe<Breaks_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: break_type */
export type Break_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "break_type" */
export enum Break_Type_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "break_type" */
export type Break_Type_Set_Input = {
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "break_type" */
export enum Break_Type_Update_Column {
  /** column name */
  Value = 'value'
}

/** columns and relationships of "event_status" */
export type Event_Status = {
  __typename?: 'event_status';
  /** An array relationship */
  Events: Array<Events>;
  /** An aggregate relationship */
  Events_aggregate: Events_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "event_status" */
export type Event_StatusEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


/** columns and relationships of "event_status" */
export type Event_StatusEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};

/** aggregated selection of "event_status" */
export type Event_Status_Aggregate = {
  __typename?: 'event_status_aggregate';
  aggregate?: Maybe<Event_Status_Aggregate_Fields>;
  nodes: Array<Event_Status>;
};

/** aggregate fields of "event_status" */
export type Event_Status_Aggregate_Fields = {
  __typename?: 'event_status_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Event_Status_Max_Fields>;
  min?: Maybe<Event_Status_Min_Fields>;
};


/** aggregate fields of "event_status" */
export type Event_Status_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Event_Status_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "event_status". All fields are combined with a logical 'AND'. */
export type Event_Status_Bool_Exp = {
  Events?: Maybe<Events_Bool_Exp>;
  _and?: Maybe<Array<Event_Status_Bool_Exp>>;
  _not?: Maybe<Event_Status_Bool_Exp>;
  _or?: Maybe<Array<Event_Status_Bool_Exp>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "event_status" */
export enum Event_Status_Constraint {
  /** unique or primary key constraint */
  EventStatusPkey = 'event_status_pkey'
}

export enum Event_Status_Enum {
  Completed = 'COMPLETED',
  Draft = 'DRAFT',
  Live = 'LIVE',
  Scheduled = 'SCHEDULED'
}

/** Boolean expression to compare columns of type "event_status_enum". All fields are combined with logical 'AND'. */
export type Event_Status_Enum_Comparison_Exp = {
  _eq?: Maybe<Event_Status_Enum>;
  _in?: Maybe<Array<Event_Status_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Event_Status_Enum>;
  _nin?: Maybe<Array<Event_Status_Enum>>;
};

/** input type for inserting data into table "event_status" */
export type Event_Status_Insert_Input = {
  Events?: Maybe<Events_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Event_Status_Max_Fields = {
  __typename?: 'event_status_max_fields';
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Event_Status_Min_Fields = {
  __typename?: 'event_status_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "event_status" */
export type Event_Status_Mutation_Response = {
  __typename?: 'event_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Event_Status>;
};

/** input type for inserting object relation for remote table "event_status" */
export type Event_Status_Obj_Rel_Insert_Input = {
  data: Event_Status_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Event_Status_On_Conflict>;
};

/** on conflict condition type for table "event_status" */
export type Event_Status_On_Conflict = {
  constraint: Event_Status_Constraint;
  update_columns?: Array<Event_Status_Update_Column>;
  where?: Maybe<Event_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "event_status". */
export type Event_Status_Order_By = {
  Events_aggregate?: Maybe<Events_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: event_status */
export type Event_Status_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "event_status" */
export enum Event_Status_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "event_status" */
export type Event_Status_Set_Input = {
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "event_status" */
export enum Event_Status_Update_Column {
  /** column name */
  Value = 'value'
}


/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "Addresses" */
  delete_Addresses?: Maybe<Addresses_Mutation_Response>;
  /** delete single row from the table: "Addresses" */
  delete_Addresses_by_pk?: Maybe<Addresses>;
  /** delete data from the table: "BreakProductItems" */
  delete_BreakProductItems?: Maybe<BreakProductItems_Mutation_Response>;
  /** delete single row from the table: "BreakProductItems" */
  delete_BreakProductItems_by_pk?: Maybe<BreakProductItems>;
  /** delete data from the table: "BreakerProfiles" */
  delete_BreakerProfiles?: Maybe<BreakerProfiles_Mutation_Response>;
  /** delete single row from the table: "BreakerProfiles" */
  delete_BreakerProfiles_by_pk?: Maybe<BreakerProfiles>;
  /** delete data from the table: "Breaks" */
  delete_Breaks?: Maybe<Breaks_Mutation_Response>;
  /** delete single row from the table: "Breaks" */
  delete_Breaks_by_pk?: Maybe<Breaks>;
  /** delete data from the table: "Events" */
  delete_Events?: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "Events" */
  delete_Events_by_pk?: Maybe<Events>;
  /** delete data from the table: "ExtensibleValues" */
  delete_ExtensibleValues?: Maybe<ExtensibleValues_Mutation_Response>;
  /** delete single row from the table: "ExtensibleValues" */
  delete_ExtensibleValues_by_pk?: Maybe<ExtensibleValues>;
  /** delete data from the table: "Inventory" */
  delete_Inventory?: Maybe<Inventory_Mutation_Response>;
  /** delete single row from the table: "Inventory" */
  delete_Inventory_by_pk?: Maybe<Inventory>;
  /** delete data from the table: "Notifications" */
  delete_Notifications?: Maybe<Notifications_Mutation_Response>;
  /** delete single row from the table: "Notifications" */
  delete_Notifications_by_pk?: Maybe<Notifications>;
  /** delete data from the table: "Orders" */
  delete_Orders?: Maybe<Orders_Mutation_Response>;
  /** delete single row from the table: "Orders" */
  delete_Orders_by_pk?: Maybe<Orders>;
  /** delete data from the table: "Products" */
  delete_Products?: Maybe<Products_Mutation_Response>;
  /** delete single row from the table: "Products" */
  delete_Products_by_pk?: Maybe<Products>;
  /** delete data from the table: "UserPreferences" */
  delete_UserPreferences?: Maybe<UserPreferences_Mutation_Response>;
  /** delete single row from the table: "UserPreferences" */
  delete_UserPreferences_by_pk?: Maybe<UserPreferences>;
  /** delete data from the table: "Users" */
  delete_Users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "Users" */
  delete_Users_by_pk?: Maybe<Users>;
  /** delete data from the table: "break_status" */
  delete_break_status?: Maybe<Break_Status_Mutation_Response>;
  /** delete single row from the table: "break_status" */
  delete_break_status_by_pk?: Maybe<Break_Status>;
  /** delete data from the table: "break_type" */
  delete_break_type?: Maybe<Break_Type_Mutation_Response>;
  /** delete single row from the table: "break_type" */
  delete_break_type_by_pk?: Maybe<Break_Type>;
  /** delete data from the table: "event_status" */
  delete_event_status?: Maybe<Event_Status_Mutation_Response>;
  /** delete single row from the table: "event_status" */
  delete_event_status_by_pk?: Maybe<Event_Status>;
  /** delete data from the table: "unit_of_measure" */
  delete_unit_of_measure?: Maybe<Unit_Of_Measure_Mutation_Response>;
  /** delete single row from the table: "unit_of_measure" */
  delete_unit_of_measure_by_pk?: Maybe<Unit_Of_Measure>;
  /** delete data from the table: "user_role" */
  delete_user_role?: Maybe<User_Role_Mutation_Response>;
  /** delete single row from the table: "user_role" */
  delete_user_role_by_pk?: Maybe<User_Role>;
  /** insert data into the table: "Addresses" */
  insert_Addresses?: Maybe<Addresses_Mutation_Response>;
  /** insert a single row into the table: "Addresses" */
  insert_Addresses_one?: Maybe<Addresses>;
  /** insert data into the table: "BreakProductItems" */
  insert_BreakProductItems?: Maybe<BreakProductItems_Mutation_Response>;
  /** insert a single row into the table: "BreakProductItems" */
  insert_BreakProductItems_one?: Maybe<BreakProductItems>;
  /** insert data into the table: "BreakerProfiles" */
  insert_BreakerProfiles?: Maybe<BreakerProfiles_Mutation_Response>;
  /** insert a single row into the table: "BreakerProfiles" */
  insert_BreakerProfiles_one?: Maybe<BreakerProfiles>;
  /** insert data into the table: "Breaks" */
  insert_Breaks?: Maybe<Breaks_Mutation_Response>;
  /** insert a single row into the table: "Breaks" */
  insert_Breaks_one?: Maybe<Breaks>;
  /** insert data into the table: "Events" */
  insert_Events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "Events" */
  insert_Events_one?: Maybe<Events>;
  /** insert data into the table: "ExtensibleValues" */
  insert_ExtensibleValues?: Maybe<ExtensibleValues_Mutation_Response>;
  /** insert a single row into the table: "ExtensibleValues" */
  insert_ExtensibleValues_one?: Maybe<ExtensibleValues>;
  /** insert data into the table: "Inventory" */
  insert_Inventory?: Maybe<Inventory_Mutation_Response>;
  /** insert a single row into the table: "Inventory" */
  insert_Inventory_one?: Maybe<Inventory>;
  /** insert data into the table: "Notifications" */
  insert_Notifications?: Maybe<Notifications_Mutation_Response>;
  /** insert a single row into the table: "Notifications" */
  insert_Notifications_one?: Maybe<Notifications>;
  /** insert data into the table: "Orders" */
  insert_Orders?: Maybe<Orders_Mutation_Response>;
  /** insert a single row into the table: "Orders" */
  insert_Orders_one?: Maybe<Orders>;
  /** insert data into the table: "Products" */
  insert_Products?: Maybe<Products_Mutation_Response>;
  /** insert a single row into the table: "Products" */
  insert_Products_one?: Maybe<Products>;
  /** insert data into the table: "UserPreferences" */
  insert_UserPreferences?: Maybe<UserPreferences_Mutation_Response>;
  /** insert a single row into the table: "UserPreferences" */
  insert_UserPreferences_one?: Maybe<UserPreferences>;
  /** insert data into the table: "Users" */
  insert_Users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "Users" */
  insert_Users_one?: Maybe<Users>;
  /** insert data into the table: "break_status" */
  insert_break_status?: Maybe<Break_Status_Mutation_Response>;
  /** insert a single row into the table: "break_status" */
  insert_break_status_one?: Maybe<Break_Status>;
  /** insert data into the table: "break_type" */
  insert_break_type?: Maybe<Break_Type_Mutation_Response>;
  /** insert a single row into the table: "break_type" */
  insert_break_type_one?: Maybe<Break_Type>;
  /** insert data into the table: "event_status" */
  insert_event_status?: Maybe<Event_Status_Mutation_Response>;
  /** insert a single row into the table: "event_status" */
  insert_event_status_one?: Maybe<Event_Status>;
  /** insert data into the table: "unit_of_measure" */
  insert_unit_of_measure?: Maybe<Unit_Of_Measure_Mutation_Response>;
  /** insert a single row into the table: "unit_of_measure" */
  insert_unit_of_measure_one?: Maybe<Unit_Of_Measure>;
  /** insert data into the table: "user_role" */
  insert_user_role?: Maybe<User_Role_Mutation_Response>;
  /** insert a single row into the table: "user_role" */
  insert_user_role_one?: Maybe<User_Role>;
  /** update data of the table: "Addresses" */
  update_Addresses?: Maybe<Addresses_Mutation_Response>;
  /** update single row of the table: "Addresses" */
  update_Addresses_by_pk?: Maybe<Addresses>;
  /** update data of the table: "BreakProductItems" */
  update_BreakProductItems?: Maybe<BreakProductItems_Mutation_Response>;
  /** update single row of the table: "BreakProductItems" */
  update_BreakProductItems_by_pk?: Maybe<BreakProductItems>;
  /** update data of the table: "BreakerProfiles" */
  update_BreakerProfiles?: Maybe<BreakerProfiles_Mutation_Response>;
  /** update single row of the table: "BreakerProfiles" */
  update_BreakerProfiles_by_pk?: Maybe<BreakerProfiles>;
  /** update data of the table: "Breaks" */
  update_Breaks?: Maybe<Breaks_Mutation_Response>;
  /** update single row of the table: "Breaks" */
  update_Breaks_by_pk?: Maybe<Breaks>;
  /** update data of the table: "Events" */
  update_Events?: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "Events" */
  update_Events_by_pk?: Maybe<Events>;
  /** update data of the table: "ExtensibleValues" */
  update_ExtensibleValues?: Maybe<ExtensibleValues_Mutation_Response>;
  /** update single row of the table: "ExtensibleValues" */
  update_ExtensibleValues_by_pk?: Maybe<ExtensibleValues>;
  /** update data of the table: "Inventory" */
  update_Inventory?: Maybe<Inventory_Mutation_Response>;
  /** update single row of the table: "Inventory" */
  update_Inventory_by_pk?: Maybe<Inventory>;
  /** update data of the table: "Notifications" */
  update_Notifications?: Maybe<Notifications_Mutation_Response>;
  /** update single row of the table: "Notifications" */
  update_Notifications_by_pk?: Maybe<Notifications>;
  /** update data of the table: "Orders" */
  update_Orders?: Maybe<Orders_Mutation_Response>;
  /** update single row of the table: "Orders" */
  update_Orders_by_pk?: Maybe<Orders>;
  /** update data of the table: "Products" */
  update_Products?: Maybe<Products_Mutation_Response>;
  /** update single row of the table: "Products" */
  update_Products_by_pk?: Maybe<Products>;
  /** update data of the table: "UserPreferences" */
  update_UserPreferences?: Maybe<UserPreferences_Mutation_Response>;
  /** update single row of the table: "UserPreferences" */
  update_UserPreferences_by_pk?: Maybe<UserPreferences>;
  /** update data of the table: "Users" */
  update_Users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "Users" */
  update_Users_by_pk?: Maybe<Users>;
  /** update data of the table: "break_status" */
  update_break_status?: Maybe<Break_Status_Mutation_Response>;
  /** update single row of the table: "break_status" */
  update_break_status_by_pk?: Maybe<Break_Status>;
  /** update data of the table: "break_type" */
  update_break_type?: Maybe<Break_Type_Mutation_Response>;
  /** update single row of the table: "break_type" */
  update_break_type_by_pk?: Maybe<Break_Type>;
  /** update data of the table: "event_status" */
  update_event_status?: Maybe<Event_Status_Mutation_Response>;
  /** update single row of the table: "event_status" */
  update_event_status_by_pk?: Maybe<Event_Status>;
  /** update data of the table: "unit_of_measure" */
  update_unit_of_measure?: Maybe<Unit_Of_Measure_Mutation_Response>;
  /** update single row of the table: "unit_of_measure" */
  update_unit_of_measure_by_pk?: Maybe<Unit_Of_Measure>;
  /** update data of the table: "user_role" */
  update_user_role?: Maybe<User_Role_Mutation_Response>;
  /** update single row of the table: "user_role" */
  update_user_role_by_pk?: Maybe<User_Role>;
};


/** mutation root */
export type Mutation_RootDelete_AddressesArgs = {
  where: Addresses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Addresses_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_BreakProductItemsArgs = {
  where: BreakProductItems_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_BreakProductItems_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_BreakerProfilesArgs = {
  where: BreakerProfiles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_BreakerProfiles_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_BreaksArgs = {
  where: Breaks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Breaks_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExtensibleValuesArgs = {
  where: ExtensibleValues_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ExtensibleValues_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_InventoryArgs = {
  where: Inventory_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Inventory_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_NotificationsArgs = {
  where: Notifications_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Notifications_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_OrdersArgs = {
  where: Orders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Orders_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UserPreferencesArgs = {
  where: UserPreferences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_UserPreferences_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Break_StatusArgs = {
  where: Break_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Break_Status_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Break_TypeArgs = {
  where: Break_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Break_Type_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Event_StatusArgs = {
  where: Event_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Event_Status_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Unit_Of_MeasureArgs = {
  where: Unit_Of_Measure_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Unit_Of_Measure_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_User_RoleArgs = {
  where: User_Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Role_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_AddressesArgs = {
  objects: Array<Addresses_Insert_Input>;
  on_conflict?: Maybe<Addresses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Addresses_OneArgs = {
  object: Addresses_Insert_Input;
  on_conflict?: Maybe<Addresses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BreakProductItemsArgs = {
  objects: Array<BreakProductItems_Insert_Input>;
  on_conflict?: Maybe<BreakProductItems_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BreakProductItems_OneArgs = {
  object: BreakProductItems_Insert_Input;
  on_conflict?: Maybe<BreakProductItems_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BreakerProfilesArgs = {
  objects: Array<BreakerProfiles_Insert_Input>;
  on_conflict?: Maybe<BreakerProfiles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BreakerProfiles_OneArgs = {
  object: BreakerProfiles_Insert_Input;
  on_conflict?: Maybe<BreakerProfiles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BreaksArgs = {
  objects: Array<Breaks_Insert_Input>;
  on_conflict?: Maybe<Breaks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Breaks_OneArgs = {
  object: Breaks_Insert_Input;
  on_conflict?: Maybe<Breaks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict?: Maybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: Maybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExtensibleValuesArgs = {
  objects: Array<ExtensibleValues_Insert_Input>;
  on_conflict?: Maybe<ExtensibleValues_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExtensibleValues_OneArgs = {
  object: ExtensibleValues_Insert_Input;
  on_conflict?: Maybe<ExtensibleValues_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InventoryArgs = {
  objects: Array<Inventory_Insert_Input>;
  on_conflict?: Maybe<Inventory_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Inventory_OneArgs = {
  object: Inventory_Insert_Input;
  on_conflict?: Maybe<Inventory_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_NotificationsArgs = {
  objects: Array<Notifications_Insert_Input>;
  on_conflict?: Maybe<Notifications_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Notifications_OneArgs = {
  object: Notifications_Insert_Input;
  on_conflict?: Maybe<Notifications_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrdersArgs = {
  objects: Array<Orders_Insert_Input>;
  on_conflict?: Maybe<Orders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Orders_OneArgs = {
  object: Orders_Insert_Input;
  on_conflict?: Maybe<Orders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: Maybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: Maybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserPreferencesArgs = {
  objects: Array<UserPreferences_Insert_Input>;
  on_conflict?: Maybe<UserPreferences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserPreferences_OneArgs = {
  object: UserPreferences_Insert_Input;
  on_conflict?: Maybe<UserPreferences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Break_StatusArgs = {
  objects: Array<Break_Status_Insert_Input>;
  on_conflict?: Maybe<Break_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Break_Status_OneArgs = {
  object: Break_Status_Insert_Input;
  on_conflict?: Maybe<Break_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Break_TypeArgs = {
  objects: Array<Break_Type_Insert_Input>;
  on_conflict?: Maybe<Break_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Break_Type_OneArgs = {
  object: Break_Type_Insert_Input;
  on_conflict?: Maybe<Break_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Event_StatusArgs = {
  objects: Array<Event_Status_Insert_Input>;
  on_conflict?: Maybe<Event_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Event_Status_OneArgs = {
  object: Event_Status_Insert_Input;
  on_conflict?: Maybe<Event_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Unit_Of_MeasureArgs = {
  objects: Array<Unit_Of_Measure_Insert_Input>;
  on_conflict?: Maybe<Unit_Of_Measure_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Unit_Of_Measure_OneArgs = {
  object: Unit_Of_Measure_Insert_Input;
  on_conflict?: Maybe<Unit_Of_Measure_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_RoleArgs = {
  objects: Array<User_Role_Insert_Input>;
  on_conflict?: Maybe<User_Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Role_OneArgs = {
  object: User_Role_Insert_Input;
  on_conflict?: Maybe<User_Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AddressesArgs = {
  _set?: Maybe<Addresses_Set_Input>;
  where: Addresses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Addresses_By_PkArgs = {
  _set?: Maybe<Addresses_Set_Input>;
  pk_columns: Addresses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_BreakProductItemsArgs = {
  _inc?: Maybe<BreakProductItems_Inc_Input>;
  _set?: Maybe<BreakProductItems_Set_Input>;
  where: BreakProductItems_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_BreakProductItems_By_PkArgs = {
  _inc?: Maybe<BreakProductItems_Inc_Input>;
  _set?: Maybe<BreakProductItems_Set_Input>;
  pk_columns: BreakProductItems_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_BreakerProfilesArgs = {
  _set?: Maybe<BreakerProfiles_Set_Input>;
  where: BreakerProfiles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_BreakerProfiles_By_PkArgs = {
  _set?: Maybe<BreakerProfiles_Set_Input>;
  pk_columns: BreakerProfiles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_BreaksArgs = {
  _append?: Maybe<Breaks_Append_Input>;
  _delete_at_path?: Maybe<Breaks_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Breaks_Delete_Elem_Input>;
  _delete_key?: Maybe<Breaks_Delete_Key_Input>;
  _inc?: Maybe<Breaks_Inc_Input>;
  _prepend?: Maybe<Breaks_Prepend_Input>;
  _set?: Maybe<Breaks_Set_Input>;
  where: Breaks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Breaks_By_PkArgs = {
  _append?: Maybe<Breaks_Append_Input>;
  _delete_at_path?: Maybe<Breaks_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Breaks_Delete_Elem_Input>;
  _delete_key?: Maybe<Breaks_Delete_Key_Input>;
  _inc?: Maybe<Breaks_Inc_Input>;
  _prepend?: Maybe<Breaks_Prepend_Input>;
  _set?: Maybe<Breaks_Set_Input>;
  pk_columns: Breaks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _set?: Maybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _set?: Maybe<Events_Set_Input>;
  pk_columns: Events_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ExtensibleValuesArgs = {
  _set?: Maybe<ExtensibleValues_Set_Input>;
  where: ExtensibleValues_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ExtensibleValues_By_PkArgs = {
  _set?: Maybe<ExtensibleValues_Set_Input>;
  pk_columns: ExtensibleValues_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_InventoryArgs = {
  _inc?: Maybe<Inventory_Inc_Input>;
  _set?: Maybe<Inventory_Set_Input>;
  where: Inventory_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Inventory_By_PkArgs = {
  _inc?: Maybe<Inventory_Inc_Input>;
  _set?: Maybe<Inventory_Set_Input>;
  pk_columns: Inventory_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_NotificationsArgs = {
  _set?: Maybe<Notifications_Set_Input>;
  where: Notifications_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Notifications_By_PkArgs = {
  _set?: Maybe<Notifications_Set_Input>;
  pk_columns: Notifications_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_OrdersArgs = {
  _inc?: Maybe<Orders_Inc_Input>;
  _set?: Maybe<Orders_Set_Input>;
  where: Orders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Orders_By_PkArgs = {
  _inc?: Maybe<Orders_Inc_Input>;
  _set?: Maybe<Orders_Set_Input>;
  pk_columns: Orders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProductsArgs = {
  _inc?: Maybe<Products_Inc_Input>;
  _set?: Maybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_By_PkArgs = {
  _inc?: Maybe<Products_Inc_Input>;
  _set?: Maybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserPreferencesArgs = {
  _set?: Maybe<UserPreferences_Set_Input>;
  where: UserPreferences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_UserPreferences_By_PkArgs = {
  _set?: Maybe<UserPreferences_Set_Input>;
  pk_columns: UserPreferences_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Break_StatusArgs = {
  _set?: Maybe<Break_Status_Set_Input>;
  where: Break_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Break_Status_By_PkArgs = {
  _set?: Maybe<Break_Status_Set_Input>;
  pk_columns: Break_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Break_TypeArgs = {
  _set?: Maybe<Break_Type_Set_Input>;
  where: Break_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Break_Type_By_PkArgs = {
  _set?: Maybe<Break_Type_Set_Input>;
  pk_columns: Break_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Event_StatusArgs = {
  _set?: Maybe<Event_Status_Set_Input>;
  where: Event_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Event_Status_By_PkArgs = {
  _set?: Maybe<Event_Status_Set_Input>;
  pk_columns: Event_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Unit_Of_MeasureArgs = {
  _set?: Maybe<Unit_Of_Measure_Set_Input>;
  where: Unit_Of_Measure_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Unit_Of_Measure_By_PkArgs = {
  _set?: Maybe<Unit_Of_Measure_Set_Input>;
  pk_columns: Unit_Of_Measure_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_RoleArgs = {
  _set?: Maybe<User_Role_Set_Input>;
  where: User_Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Role_By_PkArgs = {
  _set?: Maybe<User_Role_Set_Input>;
  pk_columns: User_Role_Pk_Columns_Input;
};


/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  Addresses: Array<Addresses>;
  /** An aggregate relationship */
  Addresses_aggregate: Addresses_Aggregate;
  /** fetch data from the table: "Addresses" using primary key columns */
  Addresses_by_pk?: Maybe<Addresses>;
  /** An array relationship */
  BreakProductItems: Array<BreakProductItems>;
  /** An aggregate relationship */
  BreakProductItems_aggregate: BreakProductItems_Aggregate;
  /** fetch data from the table: "BreakProductItems" using primary key columns */
  BreakProductItems_by_pk?: Maybe<BreakProductItems>;
  /** fetch data from the table: "BreakerProfiles" */
  BreakerProfiles: Array<BreakerProfiles>;
  /** fetch aggregated fields from the table: "BreakerProfiles" */
  BreakerProfiles_aggregate: BreakerProfiles_Aggregate;
  /** fetch data from the table: "BreakerProfiles" using primary key columns */
  BreakerProfiles_by_pk?: Maybe<BreakerProfiles>;
  /** An array relationship */
  Breaks: Array<Breaks>;
  /** An aggregate relationship */
  Breaks_aggregate: Breaks_Aggregate;
  /** fetch data from the table: "Breaks" using primary key columns */
  Breaks_by_pk?: Maybe<Breaks>;
  /** An array relationship */
  Events: Array<Events>;
  /** An aggregate relationship */
  Events_aggregate: Events_Aggregate;
  /** fetch data from the table: "Events" using primary key columns */
  Events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "ExtensibleValues" */
  ExtensibleValues: Array<ExtensibleValues>;
  /** fetch aggregated fields from the table: "ExtensibleValues" */
  ExtensibleValues_aggregate: ExtensibleValues_Aggregate;
  /** fetch data from the table: "ExtensibleValues" using primary key columns */
  ExtensibleValues_by_pk?: Maybe<ExtensibleValues>;
  /** An array relationship */
  Inventory: Array<Inventory>;
  /** An aggregate relationship */
  Inventory_aggregate: Inventory_Aggregate;
  /** fetch data from the table: "Inventory" using primary key columns */
  Inventory_by_pk?: Maybe<Inventory>;
  /** fetch data from the table: "Notifications" */
  Notifications: Array<Notifications>;
  /** fetch aggregated fields from the table: "Notifications" */
  Notifications_aggregate: Notifications_Aggregate;
  /** fetch data from the table: "Notifications" using primary key columns */
  Notifications_by_pk?: Maybe<Notifications>;
  /** fetch data from the table: "Orders" */
  Orders: Array<Orders>;
  /** An aggregate relationship */
  Orders_aggregate: Orders_Aggregate;
  /** fetch data from the table: "Orders" using primary key columns */
  Orders_by_pk?: Maybe<Orders>;
  /** An array relationship */
  Products: Array<Products>;
  /** An aggregate relationship */
  Products_aggregate: Products_Aggregate;
  /** fetch data from the table: "Products" using primary key columns */
  Products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "UserPreferences" */
  UserPreferences: Array<UserPreferences>;
  /** fetch aggregated fields from the table: "UserPreferences" */
  UserPreferences_aggregate: UserPreferences_Aggregate;
  /** fetch data from the table: "UserPreferences" using primary key columns */
  UserPreferences_by_pk?: Maybe<UserPreferences>;
  /** An array relationship */
  Users: Array<Users>;
  /** An aggregate relationship */
  Users_aggregate: Users_Aggregate;
  /** fetch data from the table: "Users" using primary key columns */
  Users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "break_status" */
  break_status: Array<Break_Status>;
  /** fetch aggregated fields from the table: "break_status" */
  break_status_aggregate: Break_Status_Aggregate;
  /** fetch data from the table: "break_status" using primary key columns */
  break_status_by_pk?: Maybe<Break_Status>;
  /** fetch data from the table: "break_type" */
  break_type: Array<Break_Type>;
  /** fetch aggregated fields from the table: "break_type" */
  break_type_aggregate: Break_Type_Aggregate;
  /** fetch data from the table: "break_type" using primary key columns */
  break_type_by_pk?: Maybe<Break_Type>;
  /** fetch data from the table: "event_status" */
  event_status: Array<Event_Status>;
  /** fetch aggregated fields from the table: "event_status" */
  event_status_aggregate: Event_Status_Aggregate;
  /** fetch data from the table: "event_status" using primary key columns */
  event_status_by_pk?: Maybe<Event_Status>;
  /** fetch data from the table: "unit_of_measure" */
  unit_of_measure: Array<Unit_Of_Measure>;
  /** fetch aggregated fields from the table: "unit_of_measure" */
  unit_of_measure_aggregate: Unit_Of_Measure_Aggregate;
  /** fetch data from the table: "unit_of_measure" using primary key columns */
  unit_of_measure_by_pk?: Maybe<Unit_Of_Measure>;
  /** fetch data from the table: "user_role" */
  user_role: Array<User_Role>;
  /** fetch aggregated fields from the table: "user_role" */
  user_role_aggregate: User_Role_Aggregate;
  /** fetch data from the table: "user_role" using primary key columns */
  user_role_by_pk?: Maybe<User_Role>;
};


export type Query_RootAddressesArgs = {
  distinct_on?: Maybe<Array<Addresses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Addresses_Order_By>>;
  where?: Maybe<Addresses_Bool_Exp>;
};


export type Query_RootAddresses_AggregateArgs = {
  distinct_on?: Maybe<Array<Addresses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Addresses_Order_By>>;
  where?: Maybe<Addresses_Bool_Exp>;
};


export type Query_RootAddresses_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootBreakProductItemsArgs = {
  distinct_on?: Maybe<Array<BreakProductItems_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakProductItems_Order_By>>;
  where?: Maybe<BreakProductItems_Bool_Exp>;
};


export type Query_RootBreakProductItems_AggregateArgs = {
  distinct_on?: Maybe<Array<BreakProductItems_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakProductItems_Order_By>>;
  where?: Maybe<BreakProductItems_Bool_Exp>;
};


export type Query_RootBreakProductItems_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootBreakerProfilesArgs = {
  distinct_on?: Maybe<Array<BreakerProfiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakerProfiles_Order_By>>;
  where?: Maybe<BreakerProfiles_Bool_Exp>;
};


export type Query_RootBreakerProfiles_AggregateArgs = {
  distinct_on?: Maybe<Array<BreakerProfiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakerProfiles_Order_By>>;
  where?: Maybe<BreakerProfiles_Bool_Exp>;
};


export type Query_RootBreakerProfiles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootBreaksArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};


export type Query_RootBreaks_AggregateArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};


export type Query_RootBreaks_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


export type Query_RootEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


export type Query_RootEvents_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootExtensibleValuesArgs = {
  distinct_on?: Maybe<Array<ExtensibleValues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ExtensibleValues_Order_By>>;
  where?: Maybe<ExtensibleValues_Bool_Exp>;
};


export type Query_RootExtensibleValues_AggregateArgs = {
  distinct_on?: Maybe<Array<ExtensibleValues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ExtensibleValues_Order_By>>;
  where?: Maybe<ExtensibleValues_Bool_Exp>;
};


export type Query_RootExtensibleValues_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootInventoryArgs = {
  distinct_on?: Maybe<Array<Inventory_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Inventory_Order_By>>;
  where?: Maybe<Inventory_Bool_Exp>;
};


export type Query_RootInventory_AggregateArgs = {
  distinct_on?: Maybe<Array<Inventory_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Inventory_Order_By>>;
  where?: Maybe<Inventory_Bool_Exp>;
};


export type Query_RootInventory_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootNotificationsArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notifications_Order_By>>;
  where?: Maybe<Notifications_Bool_Exp>;
};


export type Query_RootNotifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notifications_Order_By>>;
  where?: Maybe<Notifications_Bool_Exp>;
};


export type Query_RootNotifications_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootOrdersArgs = {
  distinct_on?: Maybe<Array<Orders_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Order_By>>;
  where?: Maybe<Orders_Bool_Exp>;
};


export type Query_RootOrders_AggregateArgs = {
  distinct_on?: Maybe<Array<Orders_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Order_By>>;
  where?: Maybe<Orders_Bool_Exp>;
};


export type Query_RootOrders_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Query_RootProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Query_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserPreferencesArgs = {
  distinct_on?: Maybe<Array<UserPreferences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserPreferences_Order_By>>;
  where?: Maybe<UserPreferences_Bool_Exp>;
};


export type Query_RootUserPreferences_AggregateArgs = {
  distinct_on?: Maybe<Array<UserPreferences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserPreferences_Order_By>>;
  where?: Maybe<UserPreferences_Bool_Exp>;
};


export type Query_RootUserPreferences_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootBreak_StatusArgs = {
  distinct_on?: Maybe<Array<Break_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Status_Order_By>>;
  where?: Maybe<Break_Status_Bool_Exp>;
};


export type Query_RootBreak_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Break_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Status_Order_By>>;
  where?: Maybe<Break_Status_Bool_Exp>;
};


export type Query_RootBreak_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootBreak_TypeArgs = {
  distinct_on?: Maybe<Array<Break_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Type_Order_By>>;
  where?: Maybe<Break_Type_Bool_Exp>;
};


export type Query_RootBreak_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Break_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Type_Order_By>>;
  where?: Maybe<Break_Type_Bool_Exp>;
};


export type Query_RootBreak_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootEvent_StatusArgs = {
  distinct_on?: Maybe<Array<Event_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Status_Order_By>>;
  where?: Maybe<Event_Status_Bool_Exp>;
};


export type Query_RootEvent_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Event_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Status_Order_By>>;
  where?: Maybe<Event_Status_Bool_Exp>;
};


export type Query_RootEvent_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootUnit_Of_MeasureArgs = {
  distinct_on?: Maybe<Array<Unit_Of_Measure_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Unit_Of_Measure_Order_By>>;
  where?: Maybe<Unit_Of_Measure_Bool_Exp>;
};


export type Query_RootUnit_Of_Measure_AggregateArgs = {
  distinct_on?: Maybe<Array<Unit_Of_Measure_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Unit_Of_Measure_Order_By>>;
  where?: Maybe<Unit_Of_Measure_Bool_Exp>;
};


export type Query_RootUnit_Of_Measure_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootUser_RoleArgs = {
  distinct_on?: Maybe<Array<User_Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Role_Order_By>>;
  where?: Maybe<User_Role_Bool_Exp>;
};


export type Query_RootUser_Role_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Role_Order_By>>;
  where?: Maybe<User_Role_Bool_Exp>;
};


export type Query_RootUser_Role_By_PkArgs = {
  value: Scalars['String'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  Addresses: Array<Addresses>;
  /** An aggregate relationship */
  Addresses_aggregate: Addresses_Aggregate;
  /** fetch data from the table: "Addresses" using primary key columns */
  Addresses_by_pk?: Maybe<Addresses>;
  /** An array relationship */
  BreakProductItems: Array<BreakProductItems>;
  /** An aggregate relationship */
  BreakProductItems_aggregate: BreakProductItems_Aggregate;
  /** fetch data from the table: "BreakProductItems" using primary key columns */
  BreakProductItems_by_pk?: Maybe<BreakProductItems>;
  /** fetch data from the table: "BreakerProfiles" */
  BreakerProfiles: Array<BreakerProfiles>;
  /** fetch aggregated fields from the table: "BreakerProfiles" */
  BreakerProfiles_aggregate: BreakerProfiles_Aggregate;
  /** fetch data from the table: "BreakerProfiles" using primary key columns */
  BreakerProfiles_by_pk?: Maybe<BreakerProfiles>;
  /** An array relationship */
  Breaks: Array<Breaks>;
  /** An aggregate relationship */
  Breaks_aggregate: Breaks_Aggregate;
  /** fetch data from the table: "Breaks" using primary key columns */
  Breaks_by_pk?: Maybe<Breaks>;
  /** An array relationship */
  Events: Array<Events>;
  /** An aggregate relationship */
  Events_aggregate: Events_Aggregate;
  /** fetch data from the table: "Events" using primary key columns */
  Events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "ExtensibleValues" */
  ExtensibleValues: Array<ExtensibleValues>;
  /** fetch aggregated fields from the table: "ExtensibleValues" */
  ExtensibleValues_aggregate: ExtensibleValues_Aggregate;
  /** fetch data from the table: "ExtensibleValues" using primary key columns */
  ExtensibleValues_by_pk?: Maybe<ExtensibleValues>;
  /** An array relationship */
  Inventory: Array<Inventory>;
  /** An aggregate relationship */
  Inventory_aggregate: Inventory_Aggregate;
  /** fetch data from the table: "Inventory" using primary key columns */
  Inventory_by_pk?: Maybe<Inventory>;
  /** fetch data from the table: "Notifications" */
  Notifications: Array<Notifications>;
  /** fetch aggregated fields from the table: "Notifications" */
  Notifications_aggregate: Notifications_Aggregate;
  /** fetch data from the table: "Notifications" using primary key columns */
  Notifications_by_pk?: Maybe<Notifications>;
  /** fetch data from the table: "Orders" */
  Orders: Array<Orders>;
  /** An aggregate relationship */
  Orders_aggregate: Orders_Aggregate;
  /** fetch data from the table: "Orders" using primary key columns */
  Orders_by_pk?: Maybe<Orders>;
  /** An array relationship */
  Products: Array<Products>;
  /** An aggregate relationship */
  Products_aggregate: Products_Aggregate;
  /** fetch data from the table: "Products" using primary key columns */
  Products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "UserPreferences" */
  UserPreferences: Array<UserPreferences>;
  /** fetch aggregated fields from the table: "UserPreferences" */
  UserPreferences_aggregate: UserPreferences_Aggregate;
  /** fetch data from the table: "UserPreferences" using primary key columns */
  UserPreferences_by_pk?: Maybe<UserPreferences>;
  /** An array relationship */
  Users: Array<Users>;
  /** An aggregate relationship */
  Users_aggregate: Users_Aggregate;
  /** fetch data from the table: "Users" using primary key columns */
  Users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "break_status" */
  break_status: Array<Break_Status>;
  /** fetch aggregated fields from the table: "break_status" */
  break_status_aggregate: Break_Status_Aggregate;
  /** fetch data from the table: "break_status" using primary key columns */
  break_status_by_pk?: Maybe<Break_Status>;
  /** fetch data from the table: "break_type" */
  break_type: Array<Break_Type>;
  /** fetch aggregated fields from the table: "break_type" */
  break_type_aggregate: Break_Type_Aggregate;
  /** fetch data from the table: "break_type" using primary key columns */
  break_type_by_pk?: Maybe<Break_Type>;
  /** fetch data from the table: "event_status" */
  event_status: Array<Event_Status>;
  /** fetch aggregated fields from the table: "event_status" */
  event_status_aggregate: Event_Status_Aggregate;
  /** fetch data from the table: "event_status" using primary key columns */
  event_status_by_pk?: Maybe<Event_Status>;
  /** fetch data from the table: "unit_of_measure" */
  unit_of_measure: Array<Unit_Of_Measure>;
  /** fetch aggregated fields from the table: "unit_of_measure" */
  unit_of_measure_aggregate: Unit_Of_Measure_Aggregate;
  /** fetch data from the table: "unit_of_measure" using primary key columns */
  unit_of_measure_by_pk?: Maybe<Unit_Of_Measure>;
  /** fetch data from the table: "user_role" */
  user_role: Array<User_Role>;
  /** fetch aggregated fields from the table: "user_role" */
  user_role_aggregate: User_Role_Aggregate;
  /** fetch data from the table: "user_role" using primary key columns */
  user_role_by_pk?: Maybe<User_Role>;
};


export type Subscription_RootAddressesArgs = {
  distinct_on?: Maybe<Array<Addresses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Addresses_Order_By>>;
  where?: Maybe<Addresses_Bool_Exp>;
};


export type Subscription_RootAddresses_AggregateArgs = {
  distinct_on?: Maybe<Array<Addresses_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Addresses_Order_By>>;
  where?: Maybe<Addresses_Bool_Exp>;
};


export type Subscription_RootAddresses_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootBreakProductItemsArgs = {
  distinct_on?: Maybe<Array<BreakProductItems_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakProductItems_Order_By>>;
  where?: Maybe<BreakProductItems_Bool_Exp>;
};


export type Subscription_RootBreakProductItems_AggregateArgs = {
  distinct_on?: Maybe<Array<BreakProductItems_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakProductItems_Order_By>>;
  where?: Maybe<BreakProductItems_Bool_Exp>;
};


export type Subscription_RootBreakProductItems_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootBreakerProfilesArgs = {
  distinct_on?: Maybe<Array<BreakerProfiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakerProfiles_Order_By>>;
  where?: Maybe<BreakerProfiles_Bool_Exp>;
};


export type Subscription_RootBreakerProfiles_AggregateArgs = {
  distinct_on?: Maybe<Array<BreakerProfiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<BreakerProfiles_Order_By>>;
  where?: Maybe<BreakerProfiles_Bool_Exp>;
};


export type Subscription_RootBreakerProfiles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootBreaksArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};


export type Subscription_RootBreaks_AggregateArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};


export type Subscription_RootBreaks_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootExtensibleValuesArgs = {
  distinct_on?: Maybe<Array<ExtensibleValues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ExtensibleValues_Order_By>>;
  where?: Maybe<ExtensibleValues_Bool_Exp>;
};


export type Subscription_RootExtensibleValues_AggregateArgs = {
  distinct_on?: Maybe<Array<ExtensibleValues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ExtensibleValues_Order_By>>;
  where?: Maybe<ExtensibleValues_Bool_Exp>;
};


export type Subscription_RootExtensibleValues_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootInventoryArgs = {
  distinct_on?: Maybe<Array<Inventory_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Inventory_Order_By>>;
  where?: Maybe<Inventory_Bool_Exp>;
};


export type Subscription_RootInventory_AggregateArgs = {
  distinct_on?: Maybe<Array<Inventory_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Inventory_Order_By>>;
  where?: Maybe<Inventory_Bool_Exp>;
};


export type Subscription_RootInventory_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootNotificationsArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notifications_Order_By>>;
  where?: Maybe<Notifications_Bool_Exp>;
};


export type Subscription_RootNotifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notifications_Order_By>>;
  where?: Maybe<Notifications_Bool_Exp>;
};


export type Subscription_RootNotifications_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootOrdersArgs = {
  distinct_on?: Maybe<Array<Orders_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Order_By>>;
  where?: Maybe<Orders_Bool_Exp>;
};


export type Subscription_RootOrders_AggregateArgs = {
  distinct_on?: Maybe<Array<Orders_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Orders_Order_By>>;
  where?: Maybe<Orders_Bool_Exp>;
};


export type Subscription_RootOrders_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUserPreferencesArgs = {
  distinct_on?: Maybe<Array<UserPreferences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserPreferences_Order_By>>;
  where?: Maybe<UserPreferences_Bool_Exp>;
};


export type Subscription_RootUserPreferences_AggregateArgs = {
  distinct_on?: Maybe<Array<UserPreferences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserPreferences_Order_By>>;
  where?: Maybe<UserPreferences_Bool_Exp>;
};


export type Subscription_RootUserPreferences_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBreak_StatusArgs = {
  distinct_on?: Maybe<Array<Break_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Status_Order_By>>;
  where?: Maybe<Break_Status_Bool_Exp>;
};


export type Subscription_RootBreak_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Break_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Status_Order_By>>;
  where?: Maybe<Break_Status_Bool_Exp>;
};


export type Subscription_RootBreak_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootBreak_TypeArgs = {
  distinct_on?: Maybe<Array<Break_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Type_Order_By>>;
  where?: Maybe<Break_Type_Bool_Exp>;
};


export type Subscription_RootBreak_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Break_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Type_Order_By>>;
  where?: Maybe<Break_Type_Bool_Exp>;
};


export type Subscription_RootBreak_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootEvent_StatusArgs = {
  distinct_on?: Maybe<Array<Event_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Status_Order_By>>;
  where?: Maybe<Event_Status_Bool_Exp>;
};


export type Subscription_RootEvent_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Event_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Status_Order_By>>;
  where?: Maybe<Event_Status_Bool_Exp>;
};


export type Subscription_RootEvent_Status_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootUnit_Of_MeasureArgs = {
  distinct_on?: Maybe<Array<Unit_Of_Measure_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Unit_Of_Measure_Order_By>>;
  where?: Maybe<Unit_Of_Measure_Bool_Exp>;
};


export type Subscription_RootUnit_Of_Measure_AggregateArgs = {
  distinct_on?: Maybe<Array<Unit_Of_Measure_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Unit_Of_Measure_Order_By>>;
  where?: Maybe<Unit_Of_Measure_Bool_Exp>;
};


export type Subscription_RootUnit_Of_Measure_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootUser_RoleArgs = {
  distinct_on?: Maybe<Array<User_Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Role_Order_By>>;
  where?: Maybe<User_Role_Bool_Exp>;
};


export type Subscription_RootUser_Role_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Role_Order_By>>;
  where?: Maybe<User_Role_Bool_Exp>;
};


export type Subscription_RootUser_Role_By_PkArgs = {
  value: Scalars['String'];
};


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "unit_of_measure" */
export type Unit_Of_Measure = {
  __typename?: 'unit_of_measure';
  /** An array relationship */
  Products: Array<Products>;
  /** An aggregate relationship */
  Products_aggregate: Products_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "unit_of_measure" */
export type Unit_Of_MeasureProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};


/** columns and relationships of "unit_of_measure" */
export type Unit_Of_MeasureProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

/** aggregated selection of "unit_of_measure" */
export type Unit_Of_Measure_Aggregate = {
  __typename?: 'unit_of_measure_aggregate';
  aggregate?: Maybe<Unit_Of_Measure_Aggregate_Fields>;
  nodes: Array<Unit_Of_Measure>;
};

/** aggregate fields of "unit_of_measure" */
export type Unit_Of_Measure_Aggregate_Fields = {
  __typename?: 'unit_of_measure_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Unit_Of_Measure_Max_Fields>;
  min?: Maybe<Unit_Of_Measure_Min_Fields>;
};


/** aggregate fields of "unit_of_measure" */
export type Unit_Of_Measure_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Unit_Of_Measure_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "unit_of_measure". All fields are combined with a logical 'AND'. */
export type Unit_Of_Measure_Bool_Exp = {
  Products?: Maybe<Products_Bool_Exp>;
  _and?: Maybe<Array<Unit_Of_Measure_Bool_Exp>>;
  _not?: Maybe<Unit_Of_Measure_Bool_Exp>;
  _or?: Maybe<Array<Unit_Of_Measure_Bool_Exp>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "unit_of_measure" */
export enum Unit_Of_Measure_Constraint {
  /** unique or primary key constraint */
  UnitOfMeasurePkey = 'unit_of_measure_pkey'
}

export enum Unit_Of_Measure_Enum {
  Box = 'BOX',
  Card = 'CARD',
  Case = 'CASE',
  Pack = 'PACK'
}

/** Boolean expression to compare columns of type "unit_of_measure_enum". All fields are combined with logical 'AND'. */
export type Unit_Of_Measure_Enum_Comparison_Exp = {
  _eq?: Maybe<Unit_Of_Measure_Enum>;
  _in?: Maybe<Array<Unit_Of_Measure_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Unit_Of_Measure_Enum>;
  _nin?: Maybe<Array<Unit_Of_Measure_Enum>>;
};

/** input type for inserting data into table "unit_of_measure" */
export type Unit_Of_Measure_Insert_Input = {
  Products?: Maybe<Products_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Unit_Of_Measure_Max_Fields = {
  __typename?: 'unit_of_measure_max_fields';
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Unit_Of_Measure_Min_Fields = {
  __typename?: 'unit_of_measure_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "unit_of_measure" */
export type Unit_Of_Measure_Mutation_Response = {
  __typename?: 'unit_of_measure_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Unit_Of_Measure>;
};

/** input type for inserting object relation for remote table "unit_of_measure" */
export type Unit_Of_Measure_Obj_Rel_Insert_Input = {
  data: Unit_Of_Measure_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Unit_Of_Measure_On_Conflict>;
};

/** on conflict condition type for table "unit_of_measure" */
export type Unit_Of_Measure_On_Conflict = {
  constraint: Unit_Of_Measure_Constraint;
  update_columns?: Array<Unit_Of_Measure_Update_Column>;
  where?: Maybe<Unit_Of_Measure_Bool_Exp>;
};

/** Ordering options when selecting data from "unit_of_measure". */
export type Unit_Of_Measure_Order_By = {
  Products_aggregate?: Maybe<Products_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: unit_of_measure */
export type Unit_Of_Measure_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "unit_of_measure" */
export enum Unit_Of_Measure_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "unit_of_measure" */
export type Unit_Of_Measure_Set_Input = {
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "unit_of_measure" */
export enum Unit_Of_Measure_Update_Column {
  /** column name */
  Value = 'value'
}

/** columns and relationships of "user_role" */
export type User_Role = {
  __typename?: 'user_role';
  /** An array relationship */
  Users: Array<Users>;
  /** An aggregate relationship */
  Users_aggregate: Users_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "user_role" */
export type User_RoleUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** columns and relationships of "user_role" */
export type User_RoleUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** aggregated selection of "user_role" */
export type User_Role_Aggregate = {
  __typename?: 'user_role_aggregate';
  aggregate?: Maybe<User_Role_Aggregate_Fields>;
  nodes: Array<User_Role>;
};

/** aggregate fields of "user_role" */
export type User_Role_Aggregate_Fields = {
  __typename?: 'user_role_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_Role_Max_Fields>;
  min?: Maybe<User_Role_Min_Fields>;
};


/** aggregate fields of "user_role" */
export type User_Role_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Role_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "user_role". All fields are combined with a logical 'AND'. */
export type User_Role_Bool_Exp = {
  Users?: Maybe<Users_Bool_Exp>;
  _and?: Maybe<Array<User_Role_Bool_Exp>>;
  _not?: Maybe<User_Role_Bool_Exp>;
  _or?: Maybe<Array<User_Role_Bool_Exp>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_role" */
export enum User_Role_Constraint {
  /** unique or primary key constraint */
  UserRolePkey = 'user_role_pkey'
}

export enum User_Role_Enum {
  Admin = 'ADMIN',
  Breaker = 'BREAKER',
  User = 'USER'
}

/** Boolean expression to compare columns of type "user_role_enum". All fields are combined with logical 'AND'. */
export type User_Role_Enum_Comparison_Exp = {
  _eq?: Maybe<User_Role_Enum>;
  _in?: Maybe<Array<User_Role_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<User_Role_Enum>;
  _nin?: Maybe<Array<User_Role_Enum>>;
};

/** input type for inserting data into table "user_role" */
export type User_Role_Insert_Input = {
  Users?: Maybe<Users_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Role_Max_Fields = {
  __typename?: 'user_role_max_fields';
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Role_Min_Fields = {
  __typename?: 'user_role_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user_role" */
export type User_Role_Mutation_Response = {
  __typename?: 'user_role_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Role>;
};

/** input type for inserting object relation for remote table "user_role" */
export type User_Role_Obj_Rel_Insert_Input = {
  data: User_Role_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<User_Role_On_Conflict>;
};

/** on conflict condition type for table "user_role" */
export type User_Role_On_Conflict = {
  constraint: User_Role_Constraint;
  update_columns?: Array<User_Role_Update_Column>;
  where?: Maybe<User_Role_Bool_Exp>;
};

/** Ordering options when selecting data from "user_role". */
export type User_Role_Order_By = {
  Users_aggregate?: Maybe<Users_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: user_role */
export type User_Role_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "user_role" */
export enum User_Role_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "user_role" */
export type User_Role_Set_Input = {
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "user_role" */
export enum User_Role_Update_Column {
  /** column name */
  Value = 'value'
}


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type AddressOverviewFragment = (
  { __typename?: 'Addresses' }
  & Pick<Addresses, 'first_name' | 'last_name' | 'is_default' | 'line1' | 'line2' | 'postal_zip_code' | 'state_provice_region' | 'city' | 'country'>
);

export type BreakDetailQueryVariables = Exact<{
  breakId?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['String']>;
}>;


export type BreakDetailQuery = (
  { __typename?: 'query_root' }
  & { Breaks: Array<(
    { __typename?: 'Breaks' }
    & Pick<Breaks, 'id' | 'title' | 'description' | 'image' | 'break_type'>
    & { BreakProductItems: Array<(
      { __typename?: 'BreakProductItems' }
      & Pick<BreakProductItems, 'id' | 'title' | 'price' | 'quantity' | 'bc_product_id' | 'bc_variant_id'>
    )> }
  )>, Users: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'first_name' | 'last_name'>
    & { Addresses: Array<(
      { __typename?: 'Addresses' }
      & Pick<Addresses, 'id'>
      & AddressOverviewFragment
    )> }
  )> }
);

export type BreakOverviewFragment = (
  { __typename?: 'Breaks' }
  & Pick<Breaks, 'break_type' | 'description' | 'status' | 'title'>
  & { BreakProductItems_aggregate: (
    { __typename?: 'BreakProductItems_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'BreakProductItems_aggregate_fields' }
      & { max?: Maybe<(
        { __typename?: 'BreakProductItems_max_fields' }
        & Pick<BreakProductItems_Max_Fields, 'price'>
      )>, min?: Maybe<(
        { __typename?: 'BreakProductItems_min_fields' }
        & Pick<BreakProductItems_Min_Fields, 'price'>
      )>, sum?: Maybe<(
        { __typename?: 'BreakProductItems_sum_fields' }
        & Pick<BreakProductItems_Sum_Fields, 'quantity'>
      )> }
    )> }
  ), Event: (
    { __typename?: 'Events' }
    & Pick<Events, 'id' | 'status' | 'start_time'>
    & { User: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'image'>
    ) }
  ) }
);

export type BreakerBreaksQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type BreakerBreaksQuery = (
  { __typename?: 'query_root' }
  & { Breaks: Array<(
    { __typename?: 'Breaks' }
    & Pick<Breaks, 'id'>
    & BreakOverviewFragment
  )> }
);

export type BreakerEventsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type BreakerEventsQuery = (
  { __typename?: 'query_root' }
  & { Events: Array<(
    { __typename?: 'Events' }
    & Pick<Events, 'id' | 'title' | 'status' | 'image' | 'start_time' | 'description'>
  )> }
);

export type BreakersQueryVariables = Exact<{ [key: string]: never; }>;


export type BreakersQuery = (
  { __typename?: 'query_root' }
  & { Users: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'first_name' | 'last_name' | 'image'>
    & { BreakerProfile: (
      { __typename?: 'BreakerProfiles' }
      & Pick<BreakerProfiles, 'id' | 'twitter' | 'facebook' | 'instagram' | 'video' | 'bio'>
    ) }
  )> }
);

export type DeleteUserAddressMutationVariables = Exact<{
  addressId: Scalars['uuid'];
}>;


export type DeleteUserAddressMutation = (
  { __typename?: 'mutation_root' }
  & { delete_Addresses_by_pk?: Maybe<(
    { __typename?: 'Addresses' }
    & Pick<Addresses, 'id'>
    & { User: (
      { __typename?: 'Users' }
      & Pick<Users, 'id'>
    ) }
  )> }
);

export type EventBreaksQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type EventBreaksQuery = (
  { __typename?: 'query_root' }
  & { Breaks: Array<(
    { __typename?: 'Breaks' }
    & Pick<Breaks, 'id' | 'break_type' | 'description' | 'price' | 'spots' | 'status' | 'title'>
  )> }
);

export type NewEventBreaksSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type NewEventBreaksSubscription = (
  { __typename?: 'subscription_root' }
  & { Breaks: Array<(
    { __typename?: 'Breaks' }
    & Pick<Breaks, 'id' | 'break_type' | 'description' | 'price' | 'spots' | 'status' | 'title'>
  )> }
);

export type FeaturedBreakersQueryVariables = Exact<{ [key: string]: never; }>;


export type FeaturedBreakersQuery = (
  { __typename?: 'query_root' }
  & { Users: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'first_name' | 'last_name' | 'image'>
    & { BreakerProfile: (
      { __typename?: 'BreakerProfiles' }
      & Pick<BreakerProfiles, 'id' | 'twitter' | 'facebook' | 'instagram' | 'video' | 'bio'>
    ) }
  )> }
);

export type FeaturedBreaksQueryVariables = Exact<{ [key: string]: never; }>;


export type FeaturedBreaksQuery = (
  { __typename?: 'query_root' }
  & { Breaks: Array<(
    { __typename?: 'Breaks' }
    & Pick<Breaks, 'id' | 'image' | 'title' | 'description'>
    & { Event: (
      { __typename?: 'Events' }
      & Pick<Events, 'id' | 'status' | 'start_time'>
    ) }
  )> }
);

export type NewFeaturedBreaksQueryVariables = Exact<{ [key: string]: never; }>;


export type NewFeaturedBreaksQuery = (
  { __typename?: 'query_root' }
  & { Breaks: Array<(
    { __typename?: 'Breaks' }
    & Pick<Breaks, 'id' | 'image' | 'title' | 'description'>
    & { Event: (
      { __typename?: 'Events' }
      & Pick<Events, 'id' | 'status' | 'start_time'>
    ) }
  )> }
);

export type InsertUserAddressMutationVariables = Exact<{
  address: Addresses_Insert_Input;
}>;


export type InsertUserAddressMutation = (
  { __typename?: 'mutation_root' }
  & { insert_Addresses_one?: Maybe<(
    { __typename?: 'Addresses' }
    & Pick<Addresses, 'id'>
    & { User: (
      { __typename?: 'Users' }
      & Pick<Users, 'id'>
    ) }
    & AddressOverviewFragment
  )> }
);

export type InsertUserNotificationsPreferencesMutationVariables = Exact<{
  notificationPreferences: Notifications_Insert_Input;
}>;


export type InsertUserNotificationsPreferencesMutation = (
  { __typename?: 'mutation_root' }
  & { insert_Notifications_one?: Maybe<(
    { __typename?: 'Notifications' }
    & Pick<Notifications, 'id' | 'before_15_min' | 'when_live'>
    & { User: (
      { __typename?: 'Users' }
      & Pick<Users, 'id'>
    ) }
  )> }
);

export type InsertUserPreferencesMutationVariables = Exact<{
  userPreferences: UserPreferences_Insert_Input;
}>;


export type InsertUserPreferencesMutation = (
  { __typename?: 'mutation_root' }
  & { insert_UserPreferences_one?: Maybe<(
    { __typename?: 'UserPreferences' }
    & Pick<UserPreferences, 'id' | 'break_type' | 'sports' | 'pricing' | 'frequency'>
    & { User: (
      { __typename?: 'Users' }
      & Pick<Users, 'id'>
    ) }
  )> }
);

export type LoggedUserQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type LoggedUserQuery = (
  { __typename?: 'query_root' }
  & { Users: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'image' | 'first_name' | 'last_name' | 'username'>
    & { Addresses: Array<(
      { __typename?: 'Addresses' }
      & Pick<Addresses, 'id'>
      & AddressOverviewFragment
    )>, UserPreference: (
      { __typename?: 'UserPreferences' }
      & Pick<UserPreferences, 'id' | 'pricing' | 'sports' | 'break_type'>
    ), Notification: (
      { __typename?: 'Notifications' }
      & Pick<Notifications, 'id' | 'before_15_min' | 'when_live'>
    ) }
  )> }
);

export type ScheduledBreaksQueryVariables = Exact<{ [key: string]: never; }>;


export type ScheduledBreaksQuery = (
  { __typename?: 'query_root' }
  & { Breaks: Array<(
    { __typename?: 'Breaks' }
    & Pick<Breaks, 'id'>
    & BreakOverviewFragment
  )> }
);

export type NewScheduledBreaksSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewScheduledBreaksSubscription = (
  { __typename?: 'subscription_root' }
  & { Breaks: Array<(
    { __typename?: 'Breaks' }
    & Pick<Breaks, 'id'>
    & BreakOverviewFragment
  )> }
);

export type ScheduledEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type ScheduledEventsQuery = (
  { __typename?: 'query_root' }
  & { Users: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'image' | 'first_name' | 'last_name'>
    & { Events: Array<(
      { __typename?: 'Events' }
      & Pick<Events, 'id' | 'title' | 'status' | 'image' | 'start_time' | 'description'>
    )>, BreakerProfile: (
      { __typename?: 'BreakerProfiles' }
      & Pick<BreakerProfiles, 'id' | 'twitter' | 'facebook' | 'instagram' | 'video' | 'bio'>
    ) }
  )> }
);

export type NewScheduledEventsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewScheduledEventsSubscription = (
  { __typename?: 'subscription_root' }
  & { Users: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'image' | 'first_name' | 'last_name'>
    & { Events: Array<(
      { __typename?: 'Events' }
      & Pick<Events, 'id' | 'title' | 'status' | 'image' | 'start_time' | 'description'>
    )>, BreakerProfile: (
      { __typename?: 'BreakerProfiles' }
      & Pick<BreakerProfiles, 'id' | 'twitter' | 'facebook' | 'instagram' | 'video' | 'bio'>
    ) }
  )> }
);

export type UpdateUserAddressMutationVariables = Exact<{
  address: Addresses_Set_Input;
  addressId: Addresses_Pk_Columns_Input;
}>;


export type UpdateUserAddressMutation = (
  { __typename?: 'mutation_root' }
  & { update_Addresses_by_pk?: Maybe<(
    { __typename?: 'Addresses' }
    & Pick<Addresses, 'id'>
    & { User: (
      { __typename?: 'Users' }
      & Pick<Users, 'id'>
    ) }
    & AddressOverviewFragment
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  userInput?: Maybe<Users_Set_Input>;
  userId?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'mutation_root' }
  & { update_Users?: Maybe<(
    { __typename?: 'Users_mutation_response' }
    & { returning: Array<(
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'username' | 'image'>
    )> }
  )> }
);

export type UserAddressesQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type UserAddressesQuery = (
  { __typename?: 'query_root' }
  & { Users: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'first_name' | 'last_name'>
    & { Addresses: Array<(
      { __typename?: 'Addresses' }
      & Pick<Addresses, 'id'>
      & AddressOverviewFragment
    )> }
  )> }
);

export type UserImageQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type UserImageQuery = (
  { __typename?: 'query_root' }
  & { Users: Array<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'image'>
  )> }
);

export const AddressOverviewFragmentDoc = gql`
    fragment AddressOverview on Addresses {
  first_name
  last_name
  is_default
  line1
  line2
  postal_zip_code
  state_provice_region
  city
  country
}
    `;
export const BreakOverviewFragmentDoc = gql`
    fragment BreakOverview on Breaks {
  break_type
  description
  status
  title
  BreakProductItems_aggregate {
    aggregate {
      max {
        price
      }
      min {
        price
      }
      sum {
        quantity
      }
    }
  }
  Event {
    id
    status
    start_time
    User {
      id
      image
    }
  }
}
    `;
export const BreakDetailDocument = gql`
    query BreakDetail($breakId: uuid, $userId: String) {
  Breaks(where: {id: {_eq: $breakId}}) {
    id
    title
    description
    image
    break_type
    BreakProductItems {
      id
      title
      price
      quantity
      bc_product_id
      bc_variant_id
    }
  }
  Users(where: {id: {_eq: $userId}}) {
    id
    first_name
    last_name
    Addresses {
      id
      ...AddressOverview
    }
  }
}
    ${AddressOverviewFragmentDoc}`;

/**
 * __useBreakDetailQuery__
 *
 * To run a query within a React component, call `useBreakDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useBreakDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBreakDetailQuery({
 *   variables: {
 *      breakId: // value for 'breakId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useBreakDetailQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BreakDetailQuery, BreakDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BreakDetailQuery, BreakDetailQueryVariables>(BreakDetailDocument, options);
      }
export function useBreakDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BreakDetailQuery, BreakDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BreakDetailQuery, BreakDetailQueryVariables>(BreakDetailDocument, options);
        }
export type BreakDetailQueryHookResult = ReturnType<typeof useBreakDetailQuery>;
export type BreakDetailLazyQueryHookResult = ReturnType<typeof useBreakDetailLazyQuery>;
export type BreakDetailQueryResult = Apollo.QueryResult<BreakDetailQuery, BreakDetailQueryVariables>;
export const BreakerBreaksDocument = gql`
    query BreakerBreaks($id: String!) {
  Breaks(
    where: {Event: {User: {id: {_eq: $id}}, status: {_neq: DRAFT}, _and: {status: {_neq: COMPLETED}}}}
    order_by: {Event: {start_time: asc}}
  ) {
    id
    ...BreakOverview
  }
}
    ${BreakOverviewFragmentDoc}`;

/**
 * __useBreakerBreaksQuery__
 *
 * To run a query within a React component, call `useBreakerBreaksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBreakerBreaksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBreakerBreaksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBreakerBreaksQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BreakerBreaksQuery, BreakerBreaksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BreakerBreaksQuery, BreakerBreaksQueryVariables>(BreakerBreaksDocument, options);
      }
export function useBreakerBreaksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BreakerBreaksQuery, BreakerBreaksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BreakerBreaksQuery, BreakerBreaksQueryVariables>(BreakerBreaksDocument, options);
        }
export type BreakerBreaksQueryHookResult = ReturnType<typeof useBreakerBreaksQuery>;
export type BreakerBreaksLazyQueryHookResult = ReturnType<typeof useBreakerBreaksLazyQuery>;
export type BreakerBreaksQueryResult = Apollo.QueryResult<BreakerBreaksQuery, BreakerBreaksQueryVariables>;
export const BreakerEventsDocument = gql`
    query BreakerEvents($id: String!) {
  Events(
    where: {User: {id: {_eq: $id}}, status: {_neq: DRAFT}, _and: {status: {_neq: COMPLETED}}}
  ) {
    id
    title
    status
    image
    start_time
    description
  }
}
    `;

/**
 * __useBreakerEventsQuery__
 *
 * To run a query within a React component, call `useBreakerEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBreakerEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBreakerEventsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBreakerEventsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BreakerEventsQuery, BreakerEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BreakerEventsQuery, BreakerEventsQueryVariables>(BreakerEventsDocument, options);
      }
export function useBreakerEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BreakerEventsQuery, BreakerEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BreakerEventsQuery, BreakerEventsQueryVariables>(BreakerEventsDocument, options);
        }
export type BreakerEventsQueryHookResult = ReturnType<typeof useBreakerEventsQuery>;
export type BreakerEventsLazyQueryHookResult = ReturnType<typeof useBreakerEventsLazyQuery>;
export type BreakerEventsQueryResult = Apollo.QueryResult<BreakerEventsQuery, BreakerEventsQueryVariables>;
export const BreakersDocument = gql`
    query Breakers {
  Users(where: {role: {_eq: BREAKER}}) {
    id
    first_name
    last_name
    image
    BreakerProfile {
      id
      twitter
      facebook
      instagram
      video
      bio
    }
  }
}
    `;

/**
 * __useBreakersQuery__
 *
 * To run a query within a React component, call `useBreakersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBreakersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBreakersQuery({
 *   variables: {
 *   },
 * });
 */
export function useBreakersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BreakersQuery, BreakersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BreakersQuery, BreakersQueryVariables>(BreakersDocument, options);
      }
export function useBreakersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BreakersQuery, BreakersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BreakersQuery, BreakersQueryVariables>(BreakersDocument, options);
        }
export type BreakersQueryHookResult = ReturnType<typeof useBreakersQuery>;
export type BreakersLazyQueryHookResult = ReturnType<typeof useBreakersLazyQuery>;
export type BreakersQueryResult = Apollo.QueryResult<BreakersQuery, BreakersQueryVariables>;
export const DeleteUserAddressDocument = gql`
    mutation DeleteUserAddress($addressId: uuid!) {
  delete_Addresses_by_pk(id: $addressId) {
    id
    User {
      id
    }
  }
}
    `;
export type DeleteUserAddressMutationFn = Apollo.MutationFunction<DeleteUserAddressMutation, DeleteUserAddressMutationVariables>;

/**
 * __useDeleteUserAddressMutation__
 *
 * To run a mutation, you first call `useDeleteUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserAddressMutation, { data, loading, error }] = useDeleteUserAddressMutation({
 *   variables: {
 *      addressId: // value for 'addressId'
 *   },
 * });
 */
export function useDeleteUserAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserAddressMutation, DeleteUserAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteUserAddressMutation, DeleteUserAddressMutationVariables>(DeleteUserAddressDocument, options);
      }
export type DeleteUserAddressMutationHookResult = ReturnType<typeof useDeleteUserAddressMutation>;
export type DeleteUserAddressMutationResult = Apollo.MutationResult<DeleteUserAddressMutation>;
export type DeleteUserAddressMutationOptions = Apollo.BaseMutationOptions<DeleteUserAddressMutation, DeleteUserAddressMutationVariables>;
export const EventBreaksDocument = gql`
    query EventBreaks($id: uuid!) {
  Breaks(where: {status: {_neq: COMPLETED}, Event: {id: {_eq: $id}}}) {
    id
    break_type
    description
    price
    spots
    status
    title
  }
}
    `;

/**
 * __useEventBreaksQuery__
 *
 * To run a query within a React component, call `useEventBreaksQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventBreaksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventBreaksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventBreaksQuery(baseOptions: ApolloReactHooks.QueryHookOptions<EventBreaksQuery, EventBreaksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<EventBreaksQuery, EventBreaksQueryVariables>(EventBreaksDocument, options);
      }
export function useEventBreaksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventBreaksQuery, EventBreaksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<EventBreaksQuery, EventBreaksQueryVariables>(EventBreaksDocument, options);
        }
export type EventBreaksQueryHookResult = ReturnType<typeof useEventBreaksQuery>;
export type EventBreaksLazyQueryHookResult = ReturnType<typeof useEventBreaksLazyQuery>;
export type EventBreaksQueryResult = Apollo.QueryResult<EventBreaksQuery, EventBreaksQueryVariables>;
export const NewEventBreaksDocument = gql`
    subscription NewEventBreaks($id: uuid!) {
  Breaks(where: {status: {_neq: COMPLETED}, Event: {id: {_eq: $id}}}) {
    id
    break_type
    description
    price
    spots
    status
    title
  }
}
    `;

/**
 * __useNewEventBreaksSubscription__
 *
 * To run a query within a React component, call `useNewEventBreaksSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewEventBreaksSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewEventBreaksSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNewEventBreaksSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<NewEventBreaksSubscription, NewEventBreaksSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NewEventBreaksSubscription, NewEventBreaksSubscriptionVariables>(NewEventBreaksDocument, options);
      }
export type NewEventBreaksSubscriptionHookResult = ReturnType<typeof useNewEventBreaksSubscription>;
export type NewEventBreaksSubscriptionResult = Apollo.SubscriptionResult<NewEventBreaksSubscription>;
export const FeaturedBreakersDocument = gql`
    query FeaturedBreakers {
  Users(where: {role: {_eq: BREAKER}}, limit: 6) {
    id
    first_name
    last_name
    image
    BreakerProfile {
      id
      twitter
      facebook
      instagram
      video
      bio
    }
  }
}
    `;

/**
 * __useFeaturedBreakersQuery__
 *
 * To run a query within a React component, call `useFeaturedBreakersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedBreakersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedBreakersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeaturedBreakersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeaturedBreakersQuery, FeaturedBreakersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FeaturedBreakersQuery, FeaturedBreakersQueryVariables>(FeaturedBreakersDocument, options);
      }
export function useFeaturedBreakersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeaturedBreakersQuery, FeaturedBreakersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FeaturedBreakersQuery, FeaturedBreakersQueryVariables>(FeaturedBreakersDocument, options);
        }
export type FeaturedBreakersQueryHookResult = ReturnType<typeof useFeaturedBreakersQuery>;
export type FeaturedBreakersLazyQueryHookResult = ReturnType<typeof useFeaturedBreakersLazyQuery>;
export type FeaturedBreakersQueryResult = Apollo.QueryResult<FeaturedBreakersQuery, FeaturedBreakersQueryVariables>;
export const FeaturedBreaksDocument = gql`
    query FeaturedBreaks {
  Breaks(
    limit: 6
    where: {Event: {status: {_neq: DRAFT}, _and: {status: {_neq: COMPLETED}}}}
    order_by: {Event: {start_time: asc}}
  ) {
    id
    image
    title
    description
    Event {
      id
      status
      start_time
    }
  }
}
    `;

/**
 * __useFeaturedBreaksQuery__
 *
 * To run a query within a React component, call `useFeaturedBreaksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedBreaksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedBreaksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFeaturedBreaksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeaturedBreaksQuery, FeaturedBreaksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FeaturedBreaksQuery, FeaturedBreaksQueryVariables>(FeaturedBreaksDocument, options);
      }
export function useFeaturedBreaksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeaturedBreaksQuery, FeaturedBreaksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FeaturedBreaksQuery, FeaturedBreaksQueryVariables>(FeaturedBreaksDocument, options);
        }
export type FeaturedBreaksQueryHookResult = ReturnType<typeof useFeaturedBreaksQuery>;
export type FeaturedBreaksLazyQueryHookResult = ReturnType<typeof useFeaturedBreaksLazyQuery>;
export type FeaturedBreaksQueryResult = Apollo.QueryResult<FeaturedBreaksQuery, FeaturedBreaksQueryVariables>;
export const NewFeaturedBreaksDocument = gql`
    query NewFeaturedBreaks {
  Breaks(
    limit: 6
    where: {Event: {status: {_neq: DRAFT}, _and: {status: {_neq: COMPLETED}}}}
    order_by: {Event: {start_time: asc}}
  ) {
    id
    image
    title
    description
    Event {
      id
      status
      start_time
    }
  }
}
    `;

/**
 * __useNewFeaturedBreaksQuery__
 *
 * To run a query within a React component, call `useNewFeaturedBreaksQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewFeaturedBreaksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewFeaturedBreaksQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewFeaturedBreaksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NewFeaturedBreaksQuery, NewFeaturedBreaksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<NewFeaturedBreaksQuery, NewFeaturedBreaksQueryVariables>(NewFeaturedBreaksDocument, options);
      }
export function useNewFeaturedBreaksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NewFeaturedBreaksQuery, NewFeaturedBreaksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<NewFeaturedBreaksQuery, NewFeaturedBreaksQueryVariables>(NewFeaturedBreaksDocument, options);
        }
export type NewFeaturedBreaksQueryHookResult = ReturnType<typeof useNewFeaturedBreaksQuery>;
export type NewFeaturedBreaksLazyQueryHookResult = ReturnType<typeof useNewFeaturedBreaksLazyQuery>;
export type NewFeaturedBreaksQueryResult = Apollo.QueryResult<NewFeaturedBreaksQuery, NewFeaturedBreaksQueryVariables>;
export const InsertUserAddressDocument = gql`
    mutation InsertUserAddress($address: Addresses_insert_input!) {
  insert_Addresses_one(object: $address) {
    id
    ...AddressOverview
    User {
      id
    }
  }
}
    ${AddressOverviewFragmentDoc}`;
export type InsertUserAddressMutationFn = Apollo.MutationFunction<InsertUserAddressMutation, InsertUserAddressMutationVariables>;

/**
 * __useInsertUserAddressMutation__
 *
 * To run a mutation, you first call `useInsertUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUserAddressMutation, { data, loading, error }] = useInsertUserAddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useInsertUserAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertUserAddressMutation, InsertUserAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<InsertUserAddressMutation, InsertUserAddressMutationVariables>(InsertUserAddressDocument, options);
      }
export type InsertUserAddressMutationHookResult = ReturnType<typeof useInsertUserAddressMutation>;
export type InsertUserAddressMutationResult = Apollo.MutationResult<InsertUserAddressMutation>;
export type InsertUserAddressMutationOptions = Apollo.BaseMutationOptions<InsertUserAddressMutation, InsertUserAddressMutationVariables>;
export const InsertUserNotificationsPreferencesDocument = gql`
    mutation InsertUserNotificationsPreferences($notificationPreferences: Notifications_insert_input!) {
  insert_Notifications_one(object: $notificationPreferences) {
    id
    User {
      id
    }
    before_15_min
    when_live
  }
}
    `;
export type InsertUserNotificationsPreferencesMutationFn = Apollo.MutationFunction<InsertUserNotificationsPreferencesMutation, InsertUserNotificationsPreferencesMutationVariables>;

/**
 * __useInsertUserNotificationsPreferencesMutation__
 *
 * To run a mutation, you first call `useInsertUserNotificationsPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUserNotificationsPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUserNotificationsPreferencesMutation, { data, loading, error }] = useInsertUserNotificationsPreferencesMutation({
 *   variables: {
 *      notificationPreferences: // value for 'notificationPreferences'
 *   },
 * });
 */
export function useInsertUserNotificationsPreferencesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertUserNotificationsPreferencesMutation, InsertUserNotificationsPreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<InsertUserNotificationsPreferencesMutation, InsertUserNotificationsPreferencesMutationVariables>(InsertUserNotificationsPreferencesDocument, options);
      }
export type InsertUserNotificationsPreferencesMutationHookResult = ReturnType<typeof useInsertUserNotificationsPreferencesMutation>;
export type InsertUserNotificationsPreferencesMutationResult = Apollo.MutationResult<InsertUserNotificationsPreferencesMutation>;
export type InsertUserNotificationsPreferencesMutationOptions = Apollo.BaseMutationOptions<InsertUserNotificationsPreferencesMutation, InsertUserNotificationsPreferencesMutationVariables>;
export const InsertUserPreferencesDocument = gql`
    mutation InsertUserPreferences($userPreferences: UserPreferences_insert_input!) {
  insert_UserPreferences_one(object: $userPreferences) {
    id
    User {
      id
    }
    break_type
    sports
    pricing
    frequency
  }
}
    `;
export type InsertUserPreferencesMutationFn = Apollo.MutationFunction<InsertUserPreferencesMutation, InsertUserPreferencesMutationVariables>;

/**
 * __useInsertUserPreferencesMutation__
 *
 * To run a mutation, you first call `useInsertUserPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUserPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUserPreferencesMutation, { data, loading, error }] = useInsertUserPreferencesMutation({
 *   variables: {
 *      userPreferences: // value for 'userPreferences'
 *   },
 * });
 */
export function useInsertUserPreferencesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InsertUserPreferencesMutation, InsertUserPreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<InsertUserPreferencesMutation, InsertUserPreferencesMutationVariables>(InsertUserPreferencesDocument, options);
      }
export type InsertUserPreferencesMutationHookResult = ReturnType<typeof useInsertUserPreferencesMutation>;
export type InsertUserPreferencesMutationResult = Apollo.MutationResult<InsertUserPreferencesMutation>;
export type InsertUserPreferencesMutationOptions = Apollo.BaseMutationOptions<InsertUserPreferencesMutation, InsertUserPreferencesMutationVariables>;
export const LoggedUserDocument = gql`
    query LoggedUser($id: String) {
  Users(where: {id: {_eq: $id}}) {
    id
    image
    first_name
    last_name
    username
    Addresses {
      id
      ...AddressOverview
    }
    UserPreference {
      id
      pricing
      sports
      break_type
    }
    Notification {
      id
      before_15_min
      when_live
    }
  }
}
    ${AddressOverviewFragmentDoc}`;

/**
 * __useLoggedUserQuery__
 *
 * To run a query within a React component, call `useLoggedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLoggedUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LoggedUserQuery, LoggedUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LoggedUserQuery, LoggedUserQueryVariables>(LoggedUserDocument, options);
      }
export function useLoggedUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoggedUserQuery, LoggedUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LoggedUserQuery, LoggedUserQueryVariables>(LoggedUserDocument, options);
        }
export type LoggedUserQueryHookResult = ReturnType<typeof useLoggedUserQuery>;
export type LoggedUserLazyQueryHookResult = ReturnType<typeof useLoggedUserLazyQuery>;
export type LoggedUserQueryResult = Apollo.QueryResult<LoggedUserQuery, LoggedUserQueryVariables>;
export const ScheduledBreaksDocument = gql`
    query ScheduledBreaks {
  Breaks(
    where: {Event: {status: {_neq: DRAFT}, _and: {status: {_neq: COMPLETED}}}}
    order_by: {Event: {start_time: asc}}
  ) {
    id
    ...BreakOverview
  }
}
    ${BreakOverviewFragmentDoc}`;

/**
 * __useScheduledBreaksQuery__
 *
 * To run a query within a React component, call `useScheduledBreaksQuery` and pass it any options that fit your needs.
 * When your component renders, `useScheduledBreaksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScheduledBreaksQuery({
 *   variables: {
 *   },
 * });
 */
export function useScheduledBreaksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ScheduledBreaksQuery, ScheduledBreaksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ScheduledBreaksQuery, ScheduledBreaksQueryVariables>(ScheduledBreaksDocument, options);
      }
export function useScheduledBreaksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ScheduledBreaksQuery, ScheduledBreaksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ScheduledBreaksQuery, ScheduledBreaksQueryVariables>(ScheduledBreaksDocument, options);
        }
export type ScheduledBreaksQueryHookResult = ReturnType<typeof useScheduledBreaksQuery>;
export type ScheduledBreaksLazyQueryHookResult = ReturnType<typeof useScheduledBreaksLazyQuery>;
export type ScheduledBreaksQueryResult = Apollo.QueryResult<ScheduledBreaksQuery, ScheduledBreaksQueryVariables>;
export const NewScheduledBreaksDocument = gql`
    subscription NewScheduledBreaks {
  Breaks(
    where: {Event: {status: {_neq: DRAFT}, _and: {status: {_neq: COMPLETED}}}}
    order_by: {Event: {start_time: asc}}
  ) {
    id
    ...BreakOverview
  }
}
    ${BreakOverviewFragmentDoc}`;

/**
 * __useNewScheduledBreaksSubscription__
 *
 * To run a query within a React component, call `useNewScheduledBreaksSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewScheduledBreaksSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewScheduledBreaksSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewScheduledBreaksSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewScheduledBreaksSubscription, NewScheduledBreaksSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NewScheduledBreaksSubscription, NewScheduledBreaksSubscriptionVariables>(NewScheduledBreaksDocument, options);
      }
export type NewScheduledBreaksSubscriptionHookResult = ReturnType<typeof useNewScheduledBreaksSubscription>;
export type NewScheduledBreaksSubscriptionResult = Apollo.SubscriptionResult<NewScheduledBreaksSubscription>;
export const ScheduledEventsDocument = gql`
    query ScheduledEvents {
  Users(where: {role: {_eq: BREAKER}}) {
    id
    image
    first_name
    last_name
    Events(
      limit: 5
      where: {status: {_neq: DRAFT}, _and: {status: {_neq: COMPLETED}}}
    ) {
      id
      title
      status
      image
      start_time
      description
    }
    BreakerProfile {
      id
      twitter
      facebook
      instagram
      video
      bio
    }
  }
}
    `;

/**
 * __useScheduledEventsQuery__
 *
 * To run a query within a React component, call `useScheduledEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useScheduledEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScheduledEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useScheduledEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ScheduledEventsQuery, ScheduledEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ScheduledEventsQuery, ScheduledEventsQueryVariables>(ScheduledEventsDocument, options);
      }
export function useScheduledEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ScheduledEventsQuery, ScheduledEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ScheduledEventsQuery, ScheduledEventsQueryVariables>(ScheduledEventsDocument, options);
        }
export type ScheduledEventsQueryHookResult = ReturnType<typeof useScheduledEventsQuery>;
export type ScheduledEventsLazyQueryHookResult = ReturnType<typeof useScheduledEventsLazyQuery>;
export type ScheduledEventsQueryResult = Apollo.QueryResult<ScheduledEventsQuery, ScheduledEventsQueryVariables>;
export const NewScheduledEventsDocument = gql`
    subscription NewScheduledEvents {
  Users(where: {role: {_eq: BREAKER}}) {
    id
    image
    first_name
    last_name
    Events(
      limit: 5
      where: {status: {_neq: DRAFT}, _and: {status: {_neq: COMPLETED}}}
    ) {
      id
      title
      status
      image
      start_time
      description
    }
    BreakerProfile {
      id
      twitter
      facebook
      instagram
      video
      bio
    }
  }
}
    `;

/**
 * __useNewScheduledEventsSubscription__
 *
 * To run a query within a React component, call `useNewScheduledEventsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewScheduledEventsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewScheduledEventsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewScheduledEventsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewScheduledEventsSubscription, NewScheduledEventsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NewScheduledEventsSubscription, NewScheduledEventsSubscriptionVariables>(NewScheduledEventsDocument, options);
      }
export type NewScheduledEventsSubscriptionHookResult = ReturnType<typeof useNewScheduledEventsSubscription>;
export type NewScheduledEventsSubscriptionResult = Apollo.SubscriptionResult<NewScheduledEventsSubscription>;
export const UpdateUserAddressDocument = gql`
    mutation UpdateUserAddress($address: Addresses_set_input!, $addressId: Addresses_pk_columns_input!) {
  update_Addresses_by_pk(_set: $address, pk_columns: $addressId) {
    id
    ...AddressOverview
    User {
      id
    }
  }
}
    ${AddressOverviewFragmentDoc}`;
export type UpdateUserAddressMutationFn = Apollo.MutationFunction<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>;

/**
 * __useUpdateUserAddressMutation__
 *
 * To run a mutation, you first call `useUpdateUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAddressMutation, { data, loading, error }] = useUpdateUserAddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *      addressId: // value for 'addressId'
 *   },
 * });
 */
export function useUpdateUserAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>(UpdateUserAddressDocument, options);
      }
export type UpdateUserAddressMutationHookResult = ReturnType<typeof useUpdateUserAddressMutation>;
export type UpdateUserAddressMutationResult = Apollo.MutationResult<UpdateUserAddressMutation>;
export type UpdateUserAddressMutationOptions = Apollo.BaseMutationOptions<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($userInput: Users_set_input, $userId: String) {
  update_Users(_set: $userInput, where: {id: {_eq: $userId}}) {
    returning {
      id
      username
      image
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserAddressesDocument = gql`
    query UserAddresses($id: String) {
  Users(where: {id: {_eq: $id}}) {
    id
    first_name
    last_name
    Addresses {
      id
      ...AddressOverview
    }
  }
}
    ${AddressOverviewFragmentDoc}`;

/**
 * __useUserAddressesQuery__
 *
 * To run a query within a React component, call `useUserAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAddressesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserAddressesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserAddressesQuery, UserAddressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserAddressesQuery, UserAddressesQueryVariables>(UserAddressesDocument, options);
      }
export function useUserAddressesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserAddressesQuery, UserAddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserAddressesQuery, UserAddressesQueryVariables>(UserAddressesDocument, options);
        }
export type UserAddressesQueryHookResult = ReturnType<typeof useUserAddressesQuery>;
export type UserAddressesLazyQueryHookResult = ReturnType<typeof useUserAddressesLazyQuery>;
export type UserAddressesQueryResult = Apollo.QueryResult<UserAddressesQuery, UserAddressesQueryVariables>;
export const UserImageDocument = gql`
    query UserImage($id: String) {
  Users(where: {id: {_eq: $id}}) {
    id
    image
  }
}
    `;

/**
 * __useUserImageQuery__
 *
 * To run a query within a React component, call `useUserImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserImageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserImageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserImageQuery, UserImageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserImageQuery, UserImageQueryVariables>(UserImageDocument, options);
      }
export function useUserImageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserImageQuery, UserImageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserImageQuery, UserImageQueryVariables>(UserImageDocument, options);
        }
export type UserImageQueryHookResult = ReturnType<typeof useUserImageQuery>;
export type UserImageLazyQueryHookResult = ReturnType<typeof useUserImageLazyQuery>;
export type UserImageQueryResult = Apollo.QueryResult<UserImageQuery, UserImageQueryVariables>;