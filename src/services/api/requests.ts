import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  money: any;
  numeric: any;
  smallint: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
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

/** columns and relationships of "Breaks" */
export type Breaks = {
  __typename?: 'Breaks';
  /** An object relationship */
  Event: Events;
  /** An object relationship */
  Product?: Maybe<Products>;
  /** An object relationship */
  break_status: Break_Status;
  break_type: Break_Type_Enum;
  created_at: Scalars['timestamptz'];
  description: Scalars['String'];
  event_id: Scalars['uuid'];
  id: Scalars['uuid'];
  image: Scalars['String'];
  price: Scalars['money'];
  spots: Scalars['Int'];
  status: Break_Status_Enum;
  teams_per_spot: Scalars['Int'];
  title: Scalars['String'];
  /** An object relationship */
  type: Break_Type;
  updated_at: Scalars['timestamptz'];
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
  count?: Maybe<Scalars['Int']>;
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

/** input type for inserting array relation for remote table "Breaks" */
export type Breaks_Arr_Rel_Insert_Input = {
  data: Array<Breaks_Insert_Input>;
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
  Event?: Maybe<Events_Bool_Exp>;
  Product?: Maybe<Products_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Breaks_Bool_Exp>>>;
  _not?: Maybe<Breaks_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Breaks_Bool_Exp>>>;
  break_status?: Maybe<Break_Status_Bool_Exp>;
  break_type?: Maybe<Break_Type_Enum_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  event_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  price?: Maybe<Money_Comparison_Exp>;
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
  BreaksPkey = 'Breaks_pkey',
}

/** input type for incrementing integer column in table "Breaks" */
export type Breaks_Inc_Input = {
  price?: Maybe<Scalars['money']>;
  spots?: Maybe<Scalars['Int']>;
  teams_per_spot?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "Breaks" */
export type Breaks_Insert_Input = {
  Event?: Maybe<Events_Obj_Rel_Insert_Input>;
  Product?: Maybe<Products_Obj_Rel_Insert_Input>;
  break_status?: Maybe<Break_Status_Obj_Rel_Insert_Input>;
  break_type?: Maybe<Break_Type_Enum>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  event_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['money']>;
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
  price?: Maybe<Scalars['money']>;
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
  price?: Maybe<Scalars['money']>;
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Breaks>;
};

/** input type for inserting object relation for remote table "Breaks" */
export type Breaks_Obj_Rel_Insert_Input = {
  data: Breaks_Insert_Input;
  on_conflict?: Maybe<Breaks_On_Conflict>;
};

/** on conflict condition type for table "Breaks" */
export type Breaks_On_Conflict = {
  constraint: Breaks_Constraint;
  update_columns: Array<Breaks_Update_Column>;
  where?: Maybe<Breaks_Bool_Exp>;
};

/** ordering options when selecting data from "Breaks" */
export type Breaks_Order_By = {
  Event?: Maybe<Events_Order_By>;
  Product?: Maybe<Products_Order_By>;
  break_status?: Maybe<Break_Status_Order_By>;
  break_type?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  event_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  price?: Maybe<Order_By>;
  spots?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  teams_per_spot?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  type?: Maybe<Break_Type_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "Breaks" */
export type Breaks_Pk_Columns_Input = {
  id: Scalars['uuid'];
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
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "Breaks" */
export type Breaks_Set_Input = {
  break_type?: Maybe<Break_Type_Enum>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  event_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['money']>;
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
  price?: Maybe<Scalars['money']>;
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
  UpdatedAt = 'updated_at',
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
  /** An aggregated array relationship */
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
  updated_at?: Maybe<Scalars['timestamptz']>;
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
  count?: Maybe<Scalars['Int']>;
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
  on_conflict?: Maybe<Events_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  Breaks?: Maybe<Breaks_Bool_Exp>;
  User?: Maybe<Users_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Events_Bool_Exp>>>;
  _not?: Maybe<Events_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Events_Bool_Exp>>>;
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
  EventsPkey = 'Events_pkey',
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
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Events>;
};

/** input type for inserting object relation for remote table "Events" */
export type Events_Obj_Rel_Insert_Input = {
  data: Events_Insert_Input;
  on_conflict?: Maybe<Events_On_Conflict>;
};

/** on conflict condition type for table "Events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns: Array<Events_Update_Column>;
  where?: Maybe<Events_Bool_Exp>;
};

/** ordering options when selecting data from "Events" */
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

/** primary key columns input for table: "Events" */
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
  UserId = 'user_id',
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
  UserId = 'user_id',
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
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

/** columns and relationships of "Products" */
export type Products = {
  __typename?: 'Products';
  /** An object relationship */
  Break: Breaks;
  /** An object relationship */
  SKU: Sku;
  break_id: Scalars['uuid'];
  cost_basis: Scalars['money'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  purchase_date: Scalars['timestamptz'];
  sku_id: Scalars['uuid'];
  supplier: Scalars['String'];
  updated_at: Scalars['timestamptz'];
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
  count?: Maybe<Scalars['Int']>;
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
  on_conflict?: Maybe<Products_On_Conflict>;
};

/** aggregate avg on columns */
export type Products_Avg_Fields = {
  __typename?: 'Products_avg_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Products" */
export type Products_Avg_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  Break?: Maybe<Breaks_Bool_Exp>;
  SKU?: Maybe<Sku_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Products_Bool_Exp>>>;
  _not?: Maybe<Products_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Products_Bool_Exp>>>;
  break_id?: Maybe<Uuid_Comparison_Exp>;
  cost_basis?: Maybe<Money_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  purchase_date?: Maybe<Timestamptz_Comparison_Exp>;
  sku_id?: Maybe<Uuid_Comparison_Exp>;
  supplier?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Products" */
export enum Products_Constraint {
  /** unique or primary key constraint */
  ProductsBreakIdKey = 'Products_break_id_key',
  /** unique or primary key constraint */
  ProductsPkey = 'Products_pkey',
}

/** input type for incrementing integer column in table "Products" */
export type Products_Inc_Input = {
  cost_basis?: Maybe<Scalars['money']>;
};

/** input type for inserting data into table "Products" */
export type Products_Insert_Input = {
  Break?: Maybe<Breaks_Obj_Rel_Insert_Input>;
  SKU?: Maybe<Sku_Obj_Rel_Insert_Input>;
  break_id?: Maybe<Scalars['uuid']>;
  cost_basis?: Maybe<Scalars['money']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  purchase_date?: Maybe<Scalars['timestamptz']>;
  sku_id?: Maybe<Scalars['uuid']>;
  supplier?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Products_Max_Fields = {
  __typename?: 'Products_max_fields';
  break_id?: Maybe<Scalars['uuid']>;
  cost_basis?: Maybe<Scalars['money']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  purchase_date?: Maybe<Scalars['timestamptz']>;
  sku_id?: Maybe<Scalars['uuid']>;
  supplier?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "Products" */
export type Products_Max_Order_By = {
  break_id?: Maybe<Order_By>;
  cost_basis?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  purchase_date?: Maybe<Order_By>;
  sku_id?: Maybe<Order_By>;
  supplier?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Products_Min_Fields = {
  __typename?: 'Products_min_fields';
  break_id?: Maybe<Scalars['uuid']>;
  cost_basis?: Maybe<Scalars['money']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  purchase_date?: Maybe<Scalars['timestamptz']>;
  sku_id?: Maybe<Scalars['uuid']>;
  supplier?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "Products" */
export type Products_Min_Order_By = {
  break_id?: Maybe<Order_By>;
  cost_basis?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  purchase_date?: Maybe<Order_By>;
  sku_id?: Maybe<Order_By>;
  supplier?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "Products" */
export type Products_Mutation_Response = {
  __typename?: 'Products_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Products>;
};

/** input type for inserting object relation for remote table "Products" */
export type Products_Obj_Rel_Insert_Input = {
  data: Products_Insert_Input;
  on_conflict?: Maybe<Products_On_Conflict>;
};

/** on conflict condition type for table "Products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns: Array<Products_Update_Column>;
  where?: Maybe<Products_Bool_Exp>;
};

/** ordering options when selecting data from "Products" */
export type Products_Order_By = {
  Break?: Maybe<Breaks_Order_By>;
  SKU?: Maybe<Sku_Order_By>;
  break_id?: Maybe<Order_By>;
  cost_basis?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  purchase_date?: Maybe<Order_By>;
  sku_id?: Maybe<Order_By>;
  supplier?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "Products" */
export type Products_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Products" */
export enum Products_Select_Column {
  /** column name */
  BreakId = 'break_id',
  /** column name */
  CostBasis = 'cost_basis',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PurchaseDate = 'purchase_date',
  /** column name */
  SkuId = 'sku_id',
  /** column name */
  Supplier = 'supplier',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "Products" */
export type Products_Set_Input = {
  break_id?: Maybe<Scalars['uuid']>;
  cost_basis?: Maybe<Scalars['money']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  purchase_date?: Maybe<Scalars['timestamptz']>;
  sku_id?: Maybe<Scalars['uuid']>;
  supplier?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Products_Stddev_Fields = {
  __typename?: 'Products_stddev_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Products" */
export type Products_Stddev_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Products_Stddev_Pop_Fields = {
  __typename?: 'Products_stddev_pop_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Products" */
export type Products_Stddev_Pop_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Products_Stddev_Samp_Fields = {
  __typename?: 'Products_stddev_samp_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Products" */
export type Products_Stddev_Samp_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Products_Sum_Fields = {
  __typename?: 'Products_sum_fields';
  cost_basis?: Maybe<Scalars['money']>;
};

/** order by sum() on columns of table "Products" */
export type Products_Sum_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** update columns of table "Products" */
export enum Products_Update_Column {
  /** column name */
  BreakId = 'break_id',
  /** column name */
  CostBasis = 'cost_basis',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PurchaseDate = 'purchase_date',
  /** column name */
  SkuId = 'sku_id',
  /** column name */
  Supplier = 'supplier',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** aggregate var_pop on columns */
export type Products_Var_Pop_Fields = {
  __typename?: 'Products_var_pop_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Products" */
export type Products_Var_Pop_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Products_Var_Samp_Fields = {
  __typename?: 'Products_var_samp_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Products" */
export type Products_Var_Samp_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Products_Variance_Fields = {
  __typename?: 'Products_variance_fields';
  cost_basis?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Products" */
export type Products_Variance_Order_By = {
  cost_basis?: Maybe<Order_By>;
};

/** columns and relationships of "Profiles" */
export type Profiles = {
  __typename?: 'Profiles';
  /** An object relationship */
  User: Users;
  bio: Scalars['String'];
  created_at: Scalars['timestamptz'];
  facebook?: Maybe<Scalars['String']>;
  first_name: Scalars['String'];
  id: Scalars['uuid'];
  image: Scalars['String'];
  instagram?: Maybe<Scalars['String']>;
  last_name: Scalars['String'];
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id: Scalars['String'];
  video: Scalars['String'];
};

/** aggregated selection of "Profiles" */
export type Profiles_Aggregate = {
  __typename?: 'Profiles_aggregate';
  aggregate?: Maybe<Profiles_Aggregate_Fields>;
  nodes: Array<Profiles>;
};

/** aggregate fields of "Profiles" */
export type Profiles_Aggregate_Fields = {
  __typename?: 'Profiles_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Profiles_Max_Fields>;
  min?: Maybe<Profiles_Min_Fields>;
};

/** aggregate fields of "Profiles" */
export type Profiles_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Profiles_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Profiles" */
export type Profiles_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Profiles_Max_Order_By>;
  min?: Maybe<Profiles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Profiles" */
export type Profiles_Arr_Rel_Insert_Input = {
  data: Array<Profiles_Insert_Input>;
  on_conflict?: Maybe<Profiles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Profiles". All fields are combined with a logical 'AND'. */
export type Profiles_Bool_Exp = {
  User?: Maybe<Users_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Profiles_Bool_Exp>>>;
  _not?: Maybe<Profiles_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Profiles_Bool_Exp>>>;
  bio?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  facebook?: Maybe<String_Comparison_Exp>;
  first_name?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  image?: Maybe<String_Comparison_Exp>;
  instagram?: Maybe<String_Comparison_Exp>;
  last_name?: Maybe<String_Comparison_Exp>;
  linkedin?: Maybe<String_Comparison_Exp>;
  tiktok?: Maybe<String_Comparison_Exp>;
  twitter?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
  video?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "Profiles" */
export enum Profiles_Constraint {
  /** unique or primary key constraint */
  ProfilesPkey = 'Profiles_pkey',
  /** unique or primary key constraint */
  ProfilesUserIdKey = 'Profiles_user_id_key',
}

/** input type for inserting data into table "Profiles" */
export type Profiles_Insert_Input = {
  User?: Maybe<Users_Obj_Rel_Insert_Input>;
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  facebook?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Profiles_Max_Fields = {
  __typename?: 'Profiles_max_fields';
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  facebook?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "Profiles" */
export type Profiles_Max_Order_By = {
  bio?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  facebook?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  instagram?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  linkedin?: Maybe<Order_By>;
  tiktok?: Maybe<Order_By>;
  twitter?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  video?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Profiles_Min_Fields = {
  __typename?: 'Profiles_min_fields';
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  facebook?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "Profiles" */
export type Profiles_Min_Order_By = {
  bio?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  facebook?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  instagram?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  linkedin?: Maybe<Order_By>;
  tiktok?: Maybe<Order_By>;
  twitter?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  video?: Maybe<Order_By>;
};

/** response of any mutation on the table "Profiles" */
export type Profiles_Mutation_Response = {
  __typename?: 'Profiles_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Profiles>;
};

/** input type for inserting object relation for remote table "Profiles" */
export type Profiles_Obj_Rel_Insert_Input = {
  data: Profiles_Insert_Input;
  on_conflict?: Maybe<Profiles_On_Conflict>;
};

/** on conflict condition type for table "Profiles" */
export type Profiles_On_Conflict = {
  constraint: Profiles_Constraint;
  update_columns: Array<Profiles_Update_Column>;
  where?: Maybe<Profiles_Bool_Exp>;
};

/** ordering options when selecting data from "Profiles" */
export type Profiles_Order_By = {
  User?: Maybe<Users_Order_By>;
  bio?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  facebook?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  image?: Maybe<Order_By>;
  instagram?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  linkedin?: Maybe<Order_By>;
  tiktok?: Maybe<Order_By>;
  twitter?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  video?: Maybe<Order_By>;
};

/** primary key columns input for table: "Profiles" */
export type Profiles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Profiles" */
export enum Profiles_Select_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Facebook = 'facebook',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  LastName = 'last_name',
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
  Video = 'video',
}

/** input type for updating data in table "Profiles" */
export type Profiles_Set_Input = {
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  facebook?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  tiktok?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

/** update columns of table "Profiles" */
export enum Profiles_Update_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Facebook = 'facebook',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  LastName = 'last_name',
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
  Video = 'video',
}

/** columns and relationships of "SKU" */
export type Sku = {
  __typename?: 'SKU';
  /** An array relationship */
  Products: Array<Products>;
  /** An aggregated array relationship */
  Products_aggregate: Products_Aggregate;
  autograph?: Maybe<Scalars['Boolean']>;
  boxes_per_case?: Maybe<Scalars['Int']>;
  brand: Scalars['String'];
  card_number?: Maybe<Scalars['String']>;
  cards_per_pack?: Maybe<Scalars['Int']>;
  category: Scalars['String'];
  created_at: Scalars['timestamptz'];
  description: Scalars['String'];
  grade?: Maybe<Scalars['numeric']>;
  grader?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  image: Scalars['String'];
  insert?: Maybe<Scalars['String']>;
  location: Scalars['String'];
  manufacturer: Scalars['String'];
  memoribillia?: Maybe<Scalars['String']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  paralell?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  rookie_card?: Maybe<Scalars['Boolean']>;
  sku_id: Scalars['String'];
  sku_type: Sku_Type_Enum;
  sub_brand?: Maybe<Scalars['String']>;
  /** An object relationship */
  type: Sku_Type;
  updated_at: Scalars['timestamptz'];
  year1: Scalars['smallint'];
  year2?: Maybe<Scalars['smallint']>;
};

/** columns and relationships of "SKU" */
export type SkuProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

/** columns and relationships of "SKU" */
export type SkuProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

/** aggregated selection of "SKU" */
export type Sku_Aggregate = {
  __typename?: 'SKU_aggregate';
  aggregate?: Maybe<Sku_Aggregate_Fields>;
  nodes: Array<Sku>;
};

/** aggregate fields of "SKU" */
export type Sku_Aggregate_Fields = {
  __typename?: 'SKU_aggregate_fields';
  avg?: Maybe<Sku_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Sku_Max_Fields>;
  min?: Maybe<Sku_Min_Fields>;
  stddev?: Maybe<Sku_Stddev_Fields>;
  stddev_pop?: Maybe<Sku_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sku_Stddev_Samp_Fields>;
  sum?: Maybe<Sku_Sum_Fields>;
  var_pop?: Maybe<Sku_Var_Pop_Fields>;
  var_samp?: Maybe<Sku_Var_Samp_Fields>;
  variance?: Maybe<Sku_Variance_Fields>;
};

/** aggregate fields of "SKU" */
export type Sku_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Sku_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "SKU" */
export type Sku_Aggregate_Order_By = {
  avg?: Maybe<Sku_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Sku_Max_Order_By>;
  min?: Maybe<Sku_Min_Order_By>;
  stddev?: Maybe<Sku_Stddev_Order_By>;
  stddev_pop?: Maybe<Sku_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Sku_Stddev_Samp_Order_By>;
  sum?: Maybe<Sku_Sum_Order_By>;
  var_pop?: Maybe<Sku_Var_Pop_Order_By>;
  var_samp?: Maybe<Sku_Var_Samp_Order_By>;
  variance?: Maybe<Sku_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "SKU" */
export type Sku_Arr_Rel_Insert_Input = {
  data: Array<Sku_Insert_Input>;
  on_conflict?: Maybe<Sku_On_Conflict>;
};

/** aggregate avg on columns */
export type Sku_Avg_Fields = {
  __typename?: 'SKU_avg_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
  year1?: Maybe<Scalars['Float']>;
  year2?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "SKU" */
export type Sku_Avg_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "SKU". All fields are combined with a logical 'AND'. */
export type Sku_Bool_Exp = {
  Products?: Maybe<Products_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Sku_Bool_Exp>>>;
  _not?: Maybe<Sku_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Sku_Bool_Exp>>>;
  autograph?: Maybe<Boolean_Comparison_Exp>;
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
  location?: Maybe<String_Comparison_Exp>;
  manufacturer?: Maybe<String_Comparison_Exp>;
  memoribillia?: Maybe<String_Comparison_Exp>;
  numbered?: Maybe<Int_Comparison_Exp>;
  packs_per_box?: Maybe<Int_Comparison_Exp>;
  paralell?: Maybe<String_Comparison_Exp>;
  player?: Maybe<String_Comparison_Exp>;
  product_type?: Maybe<String_Comparison_Exp>;
  rookie_card?: Maybe<Boolean_Comparison_Exp>;
  sku_id?: Maybe<String_Comparison_Exp>;
  sku_type?: Maybe<Sku_Type_Enum_Comparison_Exp>;
  sub_brand?: Maybe<String_Comparison_Exp>;
  type?: Maybe<Sku_Type_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  year1?: Maybe<Smallint_Comparison_Exp>;
  year2?: Maybe<Smallint_Comparison_Exp>;
};

/** unique or primary key constraints on table "SKU" */
export enum Sku_Constraint {
  /** unique or primary key constraint */
  SkuPkey = 'SKU_pkey',
}

/** input type for incrementing integer column in table "SKU" */
export type Sku_Inc_Input = {
  boxes_per_case?: Maybe<Scalars['Int']>;
  cards_per_pack?: Maybe<Scalars['Int']>;
  grade?: Maybe<Scalars['numeric']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  year1?: Maybe<Scalars['smallint']>;
  year2?: Maybe<Scalars['smallint']>;
};

/** input type for inserting data into table "SKU" */
export type Sku_Insert_Input = {
  Products?: Maybe<Products_Arr_Rel_Insert_Input>;
  autograph?: Maybe<Scalars['Boolean']>;
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
  location?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  memoribillia?: Maybe<Scalars['String']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  paralell?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  rookie_card?: Maybe<Scalars['Boolean']>;
  sku_id?: Maybe<Scalars['String']>;
  sku_type?: Maybe<Sku_Type_Enum>;
  sub_brand?: Maybe<Scalars['String']>;
  type?: Maybe<Sku_Type_Obj_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  year1?: Maybe<Scalars['smallint']>;
  year2?: Maybe<Scalars['smallint']>;
};

/** aggregate max on columns */
export type Sku_Max_Fields = {
  __typename?: 'SKU_max_fields';
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
  location?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  memoribillia?: Maybe<Scalars['String']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  paralell?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  sku_id?: Maybe<Scalars['String']>;
  sub_brand?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  year1?: Maybe<Scalars['smallint']>;
  year2?: Maybe<Scalars['smallint']>;
};

/** order by max() on columns of table "SKU" */
export type Sku_Max_Order_By = {
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
  location?: Maybe<Order_By>;
  manufacturer?: Maybe<Order_By>;
  memoribillia?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  paralell?: Maybe<Order_By>;
  player?: Maybe<Order_By>;
  product_type?: Maybe<Order_By>;
  sku_id?: Maybe<Order_By>;
  sub_brand?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Sku_Min_Fields = {
  __typename?: 'SKU_min_fields';
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
  location?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  memoribillia?: Maybe<Scalars['String']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  paralell?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  sku_id?: Maybe<Scalars['String']>;
  sub_brand?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  year1?: Maybe<Scalars['smallint']>;
  year2?: Maybe<Scalars['smallint']>;
};

/** order by min() on columns of table "SKU" */
export type Sku_Min_Order_By = {
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
  location?: Maybe<Order_By>;
  manufacturer?: Maybe<Order_By>;
  memoribillia?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  paralell?: Maybe<Order_By>;
  player?: Maybe<Order_By>;
  product_type?: Maybe<Order_By>;
  sku_id?: Maybe<Order_By>;
  sub_brand?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** response of any mutation on the table "SKU" */
export type Sku_Mutation_Response = {
  __typename?: 'SKU_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Sku>;
};

/** input type for inserting object relation for remote table "SKU" */
export type Sku_Obj_Rel_Insert_Input = {
  data: Sku_Insert_Input;
  on_conflict?: Maybe<Sku_On_Conflict>;
};

/** on conflict condition type for table "SKU" */
export type Sku_On_Conflict = {
  constraint: Sku_Constraint;
  update_columns: Array<Sku_Update_Column>;
  where?: Maybe<Sku_Bool_Exp>;
};

/** ordering options when selecting data from "SKU" */
export type Sku_Order_By = {
  Products_aggregate?: Maybe<Products_Aggregate_Order_By>;
  autograph?: Maybe<Order_By>;
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
  location?: Maybe<Order_By>;
  manufacturer?: Maybe<Order_By>;
  memoribillia?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  paralell?: Maybe<Order_By>;
  player?: Maybe<Order_By>;
  product_type?: Maybe<Order_By>;
  rookie_card?: Maybe<Order_By>;
  sku_id?: Maybe<Order_By>;
  sku_type?: Maybe<Order_By>;
  sub_brand?: Maybe<Order_By>;
  type?: Maybe<Sku_Type_Order_By>;
  updated_at?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** primary key columns input for table: "SKU" */
export type Sku_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "SKU" */
export enum Sku_Select_Column {
  /** column name */
  Autograph = 'autograph',
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
  Location = 'location',
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
  ProductType = 'product_type',
  /** column name */
  RookieCard = 'rookie_card',
  /** column name */
  SkuId = 'sku_id',
  /** column name */
  SkuType = 'sku_type',
  /** column name */
  SubBrand = 'sub_brand',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Year1 = 'year1',
  /** column name */
  Year2 = 'year2',
}

/** input type for updating data in table "SKU" */
export type Sku_Set_Input = {
  autograph?: Maybe<Scalars['Boolean']>;
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
  location?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  memoribillia?: Maybe<Scalars['String']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  paralell?: Maybe<Scalars['String']>;
  player?: Maybe<Scalars['String']>;
  product_type?: Maybe<Scalars['String']>;
  rookie_card?: Maybe<Scalars['Boolean']>;
  sku_id?: Maybe<Scalars['String']>;
  sku_type?: Maybe<Sku_Type_Enum>;
  sub_brand?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  year1?: Maybe<Scalars['smallint']>;
  year2?: Maybe<Scalars['smallint']>;
};

/** aggregate stddev on columns */
export type Sku_Stddev_Fields = {
  __typename?: 'SKU_stddev_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
  year1?: Maybe<Scalars['Float']>;
  year2?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "SKU" */
export type Sku_Stddev_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Sku_Stddev_Pop_Fields = {
  __typename?: 'SKU_stddev_pop_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
  year1?: Maybe<Scalars['Float']>;
  year2?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "SKU" */
export type Sku_Stddev_Pop_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Sku_Stddev_Samp_Fields = {
  __typename?: 'SKU_stddev_samp_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
  year1?: Maybe<Scalars['Float']>;
  year2?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "SKU" */
export type Sku_Stddev_Samp_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Sku_Sum_Fields = {
  __typename?: 'SKU_sum_fields';
  boxes_per_case?: Maybe<Scalars['Int']>;
  cards_per_pack?: Maybe<Scalars['Int']>;
  grade?: Maybe<Scalars['numeric']>;
  numbered?: Maybe<Scalars['Int']>;
  packs_per_box?: Maybe<Scalars['Int']>;
  year1?: Maybe<Scalars['smallint']>;
  year2?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "SKU" */
export type Sku_Sum_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** update columns of table "SKU" */
export enum Sku_Update_Column {
  /** column name */
  Autograph = 'autograph',
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
  Location = 'location',
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
  ProductType = 'product_type',
  /** column name */
  RookieCard = 'rookie_card',
  /** column name */
  SkuId = 'sku_id',
  /** column name */
  SkuType = 'sku_type',
  /** column name */
  SubBrand = 'sub_brand',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Year1 = 'year1',
  /** column name */
  Year2 = 'year2',
}

/** aggregate var_pop on columns */
export type Sku_Var_Pop_Fields = {
  __typename?: 'SKU_var_pop_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
  year1?: Maybe<Scalars['Float']>;
  year2?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "SKU" */
export type Sku_Var_Pop_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Sku_Var_Samp_Fields = {
  __typename?: 'SKU_var_samp_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
  year1?: Maybe<Scalars['Float']>;
  year2?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "SKU" */
export type Sku_Var_Samp_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Sku_Variance_Fields = {
  __typename?: 'SKU_variance_fields';
  boxes_per_case?: Maybe<Scalars['Float']>;
  cards_per_pack?: Maybe<Scalars['Float']>;
  grade?: Maybe<Scalars['Float']>;
  numbered?: Maybe<Scalars['Float']>;
  packs_per_box?: Maybe<Scalars['Float']>;
  year1?: Maybe<Scalars['Float']>;
  year2?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "SKU" */
export type Sku_Variance_Order_By = {
  boxes_per_case?: Maybe<Order_By>;
  cards_per_pack?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  numbered?: Maybe<Order_By>;
  packs_per_box?: Maybe<Order_By>;
  year1?: Maybe<Order_By>;
  year2?: Maybe<Order_By>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "Users" */
export type Users = {
  __typename?: 'Users';
  /** An array relationship */
  Events: Array<Events>;
  /** An aggregated array relationship */
  Events_aggregate: Events_Aggregate;
  /** An object relationship */
  Profile?: Maybe<Profiles>;
  created_at: Scalars['timestamptz'];
  id: Scalars['String'];
  role: User_Role_Enum;
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user_role: User_Role;
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

/** aggregated selection of "Users" */
export type Users_Aggregate = {
  __typename?: 'Users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "Users" */
export type Users_Aggregate_Fields = {
  __typename?: 'Users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
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
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  Events?: Maybe<Events_Bool_Exp>;
  Profile?: Maybe<Profiles_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  role?: Maybe<User_Role_Enum_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_role?: Maybe<User_Role_Bool_Exp>;
};

/** unique or primary key constraints on table "Users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'Users_pkey',
}

/** input type for inserting data into table "Users" */
export type Users_Insert_Input = {
  Events?: Maybe<Events_Arr_Rel_Insert_Input>;
  Profile?: Maybe<Profiles_Obj_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  role?: Maybe<User_Role_Enum>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_role?: Maybe<User_Role_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'Users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "Users" */
export type Users_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'Users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "Users" */
export type Users_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "Users" */
export type Users_Mutation_Response = {
  __typename?: 'Users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "Users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "Users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "Users" */
export type Users_Order_By = {
  Events_aggregate?: Maybe<Events_Aggregate_Order_By>;
  Profile?: Maybe<Profiles_Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  role?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_role?: Maybe<User_Role_Order_By>;
};

/** primary key columns input for table: "Users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "Users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "Users" */
export type Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  role?: Maybe<User_Role_Enum>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "Users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** columns and relationships of "break_status" */
export type Break_Status = {
  __typename?: 'break_status';
  /** An array relationship */
  Breaks: Array<Breaks>;
  /** An aggregated array relationship */
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Break_Status_Max_Fields>;
  min?: Maybe<Break_Status_Min_Fields>;
};

/** aggregate fields of "break_status" */
export type Break_Status_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Break_Status_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "break_status" */
export type Break_Status_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Break_Status_Max_Order_By>;
  min?: Maybe<Break_Status_Min_Order_By>;
};

/** input type for inserting array relation for remote table "break_status" */
export type Break_Status_Arr_Rel_Insert_Input = {
  data: Array<Break_Status_Insert_Input>;
  on_conflict?: Maybe<Break_Status_On_Conflict>;
};

/** Boolean expression to filter rows from the table "break_status". All fields are combined with a logical 'AND'. */
export type Break_Status_Bool_Exp = {
  Breaks?: Maybe<Breaks_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Break_Status_Bool_Exp>>>;
  _not?: Maybe<Break_Status_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Break_Status_Bool_Exp>>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "break_status" */
export enum Break_Status_Constraint {
  /** unique or primary key constraint */
  BreakStatusPkey = 'break_status_pkey',
}

export enum Break_Status_Enum {
  Available = 'AVAILABLE',
  Completed = 'COMPLETED',
  Soldout = 'SOLDOUT',
}

/** expression to compare columns of type break_status_enum. All fields are combined with logical 'AND'. */
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

/** order by max() on columns of table "break_status" */
export type Break_Status_Max_Order_By = {
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Break_Status_Min_Fields = {
  __typename?: 'break_status_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "break_status" */
export type Break_Status_Min_Order_By = {
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "break_status" */
export type Break_Status_Mutation_Response = {
  __typename?: 'break_status_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Break_Status>;
};

/** input type for inserting object relation for remote table "break_status" */
export type Break_Status_Obj_Rel_Insert_Input = {
  data: Break_Status_Insert_Input;
  on_conflict?: Maybe<Break_Status_On_Conflict>;
};

/** on conflict condition type for table "break_status" */
export type Break_Status_On_Conflict = {
  constraint: Break_Status_Constraint;
  update_columns: Array<Break_Status_Update_Column>;
  where?: Maybe<Break_Status_Bool_Exp>;
};

/** ordering options when selecting data from "break_status" */
export type Break_Status_Order_By = {
  Breaks_aggregate?: Maybe<Breaks_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "break_status" */
export type Break_Status_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "break_status" */
export enum Break_Status_Select_Column {
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "break_status" */
export type Break_Status_Set_Input = {
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "break_status" */
export enum Break_Status_Update_Column {
  /** column name */
  Value = 'value',
}

/** columns and relationships of "break_type" */
export type Break_Type = {
  __typename?: 'break_type';
  /** An array relationship */
  Breaks: Array<Breaks>;
  /** An aggregated array relationship */
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Break_Type_Max_Fields>;
  min?: Maybe<Break_Type_Min_Fields>;
};

/** aggregate fields of "break_type" */
export type Break_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Break_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "break_type" */
export type Break_Type_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Break_Type_Max_Order_By>;
  min?: Maybe<Break_Type_Min_Order_By>;
};

/** input type for inserting array relation for remote table "break_type" */
export type Break_Type_Arr_Rel_Insert_Input = {
  data: Array<Break_Type_Insert_Input>;
  on_conflict?: Maybe<Break_Type_On_Conflict>;
};

/** Boolean expression to filter rows from the table "break_type". All fields are combined with a logical 'AND'. */
export type Break_Type_Bool_Exp = {
  Breaks?: Maybe<Breaks_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Break_Type_Bool_Exp>>>;
  _not?: Maybe<Break_Type_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Break_Type_Bool_Exp>>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "break_type" */
export enum Break_Type_Constraint {
  /** unique or primary key constraint */
  BreakTypePkey = 'break_type_pkey',
}

export enum Break_Type_Enum {
  HitDraft = 'HIT_DRAFT',
  Personal = 'PERSONAL',
  PickYourDivision = 'PICK_YOUR_DIVISION',
  PickYourTeam = 'PICK_YOUR_TEAM',
  RandomDivision = 'RANDOM_DIVISION',
  RandomTeam = 'RANDOM_TEAM',
}

/** expression to compare columns of type break_type_enum. All fields are combined with logical 'AND'. */
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

/** order by max() on columns of table "break_type" */
export type Break_Type_Max_Order_By = {
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Break_Type_Min_Fields = {
  __typename?: 'break_type_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "break_type" */
export type Break_Type_Min_Order_By = {
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "break_type" */
export type Break_Type_Mutation_Response = {
  __typename?: 'break_type_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Break_Type>;
};

/** input type for inserting object relation for remote table "break_type" */
export type Break_Type_Obj_Rel_Insert_Input = {
  data: Break_Type_Insert_Input;
  on_conflict?: Maybe<Break_Type_On_Conflict>;
};

/** on conflict condition type for table "break_type" */
export type Break_Type_On_Conflict = {
  constraint: Break_Type_Constraint;
  update_columns: Array<Break_Type_Update_Column>;
  where?: Maybe<Break_Type_Bool_Exp>;
};

/** ordering options when selecting data from "break_type" */
export type Break_Type_Order_By = {
  Breaks_aggregate?: Maybe<Breaks_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "break_type" */
export type Break_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "break_type" */
export enum Break_Type_Select_Column {
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "break_type" */
export type Break_Type_Set_Input = {
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "break_type" */
export enum Break_Type_Update_Column {
  /** column name */
  Value = 'value',
}

/** columns and relationships of "event_status" */
export type Event_Status = {
  __typename?: 'event_status';
  /** An array relationship */
  Events: Array<Events>;
  /** An aggregated array relationship */
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Event_Status_Max_Fields>;
  min?: Maybe<Event_Status_Min_Fields>;
};

/** aggregate fields of "event_status" */
export type Event_Status_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Event_Status_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "event_status" */
export type Event_Status_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Event_Status_Max_Order_By>;
  min?: Maybe<Event_Status_Min_Order_By>;
};

/** input type for inserting array relation for remote table "event_status" */
export type Event_Status_Arr_Rel_Insert_Input = {
  data: Array<Event_Status_Insert_Input>;
  on_conflict?: Maybe<Event_Status_On_Conflict>;
};

/** Boolean expression to filter rows from the table "event_status". All fields are combined with a logical 'AND'. */
export type Event_Status_Bool_Exp = {
  Events?: Maybe<Events_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Event_Status_Bool_Exp>>>;
  _not?: Maybe<Event_Status_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Event_Status_Bool_Exp>>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "event_status" */
export enum Event_Status_Constraint {
  /** unique or primary key constraint */
  EventStatusPkey = 'event_status_pkey',
}

export enum Event_Status_Enum {
  Completed = 'COMPLETED',
  Live = 'LIVE',
  Scheduled = 'SCHEDULED',
}

/** expression to compare columns of type event_status_enum. All fields are combined with logical 'AND'. */
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

/** order by max() on columns of table "event_status" */
export type Event_Status_Max_Order_By = {
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Event_Status_Min_Fields = {
  __typename?: 'event_status_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "event_status" */
export type Event_Status_Min_Order_By = {
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "event_status" */
export type Event_Status_Mutation_Response = {
  __typename?: 'event_status_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Event_Status>;
};

/** input type for inserting object relation for remote table "event_status" */
export type Event_Status_Obj_Rel_Insert_Input = {
  data: Event_Status_Insert_Input;
  on_conflict?: Maybe<Event_Status_On_Conflict>;
};

/** on conflict condition type for table "event_status" */
export type Event_Status_On_Conflict = {
  constraint: Event_Status_Constraint;
  update_columns: Array<Event_Status_Update_Column>;
  where?: Maybe<Event_Status_Bool_Exp>;
};

/** ordering options when selecting data from "event_status" */
export type Event_Status_Order_By = {
  Events_aggregate?: Maybe<Events_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "event_status" */
export type Event_Status_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "event_status" */
export enum Event_Status_Select_Column {
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "event_status" */
export type Event_Status_Set_Input = {
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "event_status" */
export enum Event_Status_Update_Column {
  /** column name */
  Value = 'value',
}

/** expression to compare columns of type money. All fields are combined with logical 'AND'. */
export type Money_Comparison_Exp = {
  _eq?: Maybe<Scalars['money']>;
  _gt?: Maybe<Scalars['money']>;
  _gte?: Maybe<Scalars['money']>;
  _in?: Maybe<Array<Scalars['money']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['money']>;
  _lte?: Maybe<Scalars['money']>;
  _neq?: Maybe<Scalars['money']>;
  _nin?: Maybe<Array<Scalars['money']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "Breaks" */
  delete_Breaks?: Maybe<Breaks_Mutation_Response>;
  /** delete single row from the table: "Breaks" */
  delete_Breaks_by_pk?: Maybe<Breaks>;
  /** delete data from the table: "Events" */
  delete_Events?: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "Events" */
  delete_Events_by_pk?: Maybe<Events>;
  /** delete data from the table: "Products" */
  delete_Products?: Maybe<Products_Mutation_Response>;
  /** delete single row from the table: "Products" */
  delete_Products_by_pk?: Maybe<Products>;
  /** delete data from the table: "Profiles" */
  delete_Profiles?: Maybe<Profiles_Mutation_Response>;
  /** delete single row from the table: "Profiles" */
  delete_Profiles_by_pk?: Maybe<Profiles>;
  /** delete data from the table: "SKU" */
  delete_SKU?: Maybe<Sku_Mutation_Response>;
  /** delete single row from the table: "SKU" */
  delete_SKU_by_pk?: Maybe<Sku>;
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
  /** delete data from the table: "sku_type" */
  delete_sku_type?: Maybe<Sku_Type_Mutation_Response>;
  /** delete single row from the table: "sku_type" */
  delete_sku_type_by_pk?: Maybe<Sku_Type>;
  /** delete data from the table: "user_role" */
  delete_user_role?: Maybe<User_Role_Mutation_Response>;
  /** delete single row from the table: "user_role" */
  delete_user_role_by_pk?: Maybe<User_Role>;
  /** insert data into the table: "Breaks" */
  insert_Breaks?: Maybe<Breaks_Mutation_Response>;
  /** insert a single row into the table: "Breaks" */
  insert_Breaks_one?: Maybe<Breaks>;
  /** insert data into the table: "Events" */
  insert_Events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "Events" */
  insert_Events_one?: Maybe<Events>;
  /** insert data into the table: "Products" */
  insert_Products?: Maybe<Products_Mutation_Response>;
  /** insert a single row into the table: "Products" */
  insert_Products_one?: Maybe<Products>;
  /** insert data into the table: "Profiles" */
  insert_Profiles?: Maybe<Profiles_Mutation_Response>;
  /** insert a single row into the table: "Profiles" */
  insert_Profiles_one?: Maybe<Profiles>;
  /** insert data into the table: "SKU" */
  insert_SKU?: Maybe<Sku_Mutation_Response>;
  /** insert a single row into the table: "SKU" */
  insert_SKU_one?: Maybe<Sku>;
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
  /** insert data into the table: "sku_type" */
  insert_sku_type?: Maybe<Sku_Type_Mutation_Response>;
  /** insert a single row into the table: "sku_type" */
  insert_sku_type_one?: Maybe<Sku_Type>;
  /** insert data into the table: "user_role" */
  insert_user_role?: Maybe<User_Role_Mutation_Response>;
  /** insert a single row into the table: "user_role" */
  insert_user_role_one?: Maybe<User_Role>;
  /** update data of the table: "Breaks" */
  update_Breaks?: Maybe<Breaks_Mutation_Response>;
  /** update single row of the table: "Breaks" */
  update_Breaks_by_pk?: Maybe<Breaks>;
  /** update data of the table: "Events" */
  update_Events?: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "Events" */
  update_Events_by_pk?: Maybe<Events>;
  /** update data of the table: "Products" */
  update_Products?: Maybe<Products_Mutation_Response>;
  /** update single row of the table: "Products" */
  update_Products_by_pk?: Maybe<Products>;
  /** update data of the table: "Profiles" */
  update_Profiles?: Maybe<Profiles_Mutation_Response>;
  /** update single row of the table: "Profiles" */
  update_Profiles_by_pk?: Maybe<Profiles>;
  /** update data of the table: "SKU" */
  update_SKU?: Maybe<Sku_Mutation_Response>;
  /** update single row of the table: "SKU" */
  update_SKU_by_pk?: Maybe<Sku>;
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
  /** update data of the table: "sku_type" */
  update_sku_type?: Maybe<Sku_Type_Mutation_Response>;
  /** update single row of the table: "sku_type" */
  update_sku_type_by_pk?: Maybe<Sku_Type>;
  /** update data of the table: "user_role" */
  update_user_role?: Maybe<User_Role_Mutation_Response>;
  /** update single row of the table: "user_role" */
  update_user_role_by_pk?: Maybe<User_Role>;
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
export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_ProfilesArgs = {
  where: Profiles_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Profiles_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_SkuArgs = {
  where: Sku_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Sku_By_PkArgs = {
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
export type Mutation_RootDelete_Sku_TypeArgs = {
  where: Sku_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Sku_Type_By_PkArgs = {
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
export type Mutation_RootInsert_ProfilesArgs = {
  objects: Array<Profiles_Insert_Input>;
  on_conflict?: Maybe<Profiles_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Profiles_OneArgs = {
  object: Profiles_Insert_Input;
  on_conflict?: Maybe<Profiles_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_SkuArgs = {
  objects: Array<Sku_Insert_Input>;
  on_conflict?: Maybe<Sku_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Sku_OneArgs = {
  object: Sku_Insert_Input;
  on_conflict?: Maybe<Sku_On_Conflict>;
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
export type Mutation_RootInsert_Sku_TypeArgs = {
  objects: Array<Sku_Type_Insert_Input>;
  on_conflict?: Maybe<Sku_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Sku_Type_OneArgs = {
  object: Sku_Type_Insert_Input;
  on_conflict?: Maybe<Sku_Type_On_Conflict>;
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
export type Mutation_RootUpdate_BreaksArgs = {
  _inc?: Maybe<Breaks_Inc_Input>;
  _set?: Maybe<Breaks_Set_Input>;
  where: Breaks_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Breaks_By_PkArgs = {
  _inc?: Maybe<Breaks_Inc_Input>;
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
export type Mutation_RootUpdate_ProfilesArgs = {
  _set?: Maybe<Profiles_Set_Input>;
  where: Profiles_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Profiles_By_PkArgs = {
  _set?: Maybe<Profiles_Set_Input>;
  pk_columns: Profiles_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_SkuArgs = {
  _inc?: Maybe<Sku_Inc_Input>;
  _set?: Maybe<Sku_Set_Input>;
  where: Sku_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Sku_By_PkArgs = {
  _inc?: Maybe<Sku_Inc_Input>;
  _set?: Maybe<Sku_Set_Input>;
  pk_columns: Sku_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Sku_TypeArgs = {
  _set?: Maybe<Sku_Type_Set_Input>;
  where: Sku_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Sku_Type_By_PkArgs = {
  _set?: Maybe<Sku_Type_Set_Input>;
  pk_columns: Sku_Type_Pk_Columns_Input;
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

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
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
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Breaks" */
  Breaks: Array<Breaks>;
  /** fetch aggregated fields from the table: "Breaks" */
  Breaks_aggregate: Breaks_Aggregate;
  /** fetch data from the table: "Breaks" using primary key columns */
  Breaks_by_pk?: Maybe<Breaks>;
  /** fetch data from the table: "Events" */
  Events: Array<Events>;
  /** fetch aggregated fields from the table: "Events" */
  Events_aggregate: Events_Aggregate;
  /** fetch data from the table: "Events" using primary key columns */
  Events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "Products" */
  Products: Array<Products>;
  /** fetch aggregated fields from the table: "Products" */
  Products_aggregate: Products_Aggregate;
  /** fetch data from the table: "Products" using primary key columns */
  Products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "Profiles" */
  Profiles: Array<Profiles>;
  /** fetch aggregated fields from the table: "Profiles" */
  Profiles_aggregate: Profiles_Aggregate;
  /** fetch data from the table: "Profiles" using primary key columns */
  Profiles_by_pk?: Maybe<Profiles>;
  /** fetch data from the table: "SKU" */
  SKU: Array<Sku>;
  /** fetch aggregated fields from the table: "SKU" */
  SKU_aggregate: Sku_Aggregate;
  /** fetch data from the table: "SKU" using primary key columns */
  SKU_by_pk?: Maybe<Sku>;
  /** fetch data from the table: "Users" */
  Users: Array<Users>;
  /** fetch aggregated fields from the table: "Users" */
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
  /** fetch data from the table: "sku_type" */
  sku_type: Array<Sku_Type>;
  /** fetch aggregated fields from the table: "sku_type" */
  sku_type_aggregate: Sku_Type_Aggregate;
  /** fetch data from the table: "sku_type" using primary key columns */
  sku_type_by_pk?: Maybe<Sku_Type>;
  /** fetch data from the table: "user_role" */
  user_role: Array<User_Role>;
  /** fetch aggregated fields from the table: "user_role" */
  user_role_aggregate: User_Role_Aggregate;
  /** fetch data from the table: "user_role" using primary key columns */
  user_role_by_pk?: Maybe<User_Role>;
};

/** query root */
export type Query_RootBreaksArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};

/** query root */
export type Query_RootBreaks_AggregateArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};

/** query root */
export type Query_RootBreaks_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};

/** query root */
export type Query_RootEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};

/** query root */
export type Query_RootEvents_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

/** query root */
export type Query_RootProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

/** query root */
export type Query_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootProfilesArgs = {
  distinct_on?: Maybe<Array<Profiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profiles_Order_By>>;
  where?: Maybe<Profiles_Bool_Exp>;
};

/** query root */
export type Query_RootProfiles_AggregateArgs = {
  distinct_on?: Maybe<Array<Profiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profiles_Order_By>>;
  where?: Maybe<Profiles_Bool_Exp>;
};

/** query root */
export type Query_RootProfiles_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootSkuArgs = {
  distinct_on?: Maybe<Array<Sku_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sku_Order_By>>;
  where?: Maybe<Sku_Bool_Exp>;
};

/** query root */
export type Query_RootSku_AggregateArgs = {
  distinct_on?: Maybe<Array<Sku_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sku_Order_By>>;
  where?: Maybe<Sku_Bool_Exp>;
};

/** query root */
export type Query_RootSku_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** query root */
export type Query_RootBreak_StatusArgs = {
  distinct_on?: Maybe<Array<Break_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Status_Order_By>>;
  where?: Maybe<Break_Status_Bool_Exp>;
};

/** query root */
export type Query_RootBreak_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Break_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Status_Order_By>>;
  where?: Maybe<Break_Status_Bool_Exp>;
};

/** query root */
export type Query_RootBreak_Status_By_PkArgs = {
  value: Scalars['String'];
};

/** query root */
export type Query_RootBreak_TypeArgs = {
  distinct_on?: Maybe<Array<Break_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Type_Order_By>>;
  where?: Maybe<Break_Type_Bool_Exp>;
};

/** query root */
export type Query_RootBreak_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Break_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Type_Order_By>>;
  where?: Maybe<Break_Type_Bool_Exp>;
};

/** query root */
export type Query_RootBreak_Type_By_PkArgs = {
  value: Scalars['String'];
};

/** query root */
export type Query_RootEvent_StatusArgs = {
  distinct_on?: Maybe<Array<Event_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Status_Order_By>>;
  where?: Maybe<Event_Status_Bool_Exp>;
};

/** query root */
export type Query_RootEvent_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Event_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Status_Order_By>>;
  where?: Maybe<Event_Status_Bool_Exp>;
};

/** query root */
export type Query_RootEvent_Status_By_PkArgs = {
  value: Scalars['String'];
};

/** query root */
export type Query_RootSku_TypeArgs = {
  distinct_on?: Maybe<Array<Sku_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sku_Type_Order_By>>;
  where?: Maybe<Sku_Type_Bool_Exp>;
};

/** query root */
export type Query_RootSku_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Sku_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sku_Type_Order_By>>;
  where?: Maybe<Sku_Type_Bool_Exp>;
};

/** query root */
export type Query_RootSku_Type_By_PkArgs = {
  value: Scalars['String'];
};

/** query root */
export type Query_RootUser_RoleArgs = {
  distinct_on?: Maybe<Array<User_Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Role_Order_By>>;
  where?: Maybe<User_Role_Bool_Exp>;
};

/** query root */
export type Query_RootUser_Role_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Role_Order_By>>;
  where?: Maybe<User_Role_Bool_Exp>;
};

/** query root */
export type Query_RootUser_Role_By_PkArgs = {
  value: Scalars['String'];
};

/** columns and relationships of "sku_type" */
export type Sku_Type = {
  __typename?: 'sku_type';
  /** An array relationship */
  SKUs: Array<Sku>;
  /** An aggregated array relationship */
  SKUs_aggregate: Sku_Aggregate;
  value: Scalars['String'];
};

/** columns and relationships of "sku_type" */
export type Sku_TypeSkUsArgs = {
  distinct_on?: Maybe<Array<Sku_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sku_Order_By>>;
  where?: Maybe<Sku_Bool_Exp>;
};

/** columns and relationships of "sku_type" */
export type Sku_TypeSkUs_AggregateArgs = {
  distinct_on?: Maybe<Array<Sku_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sku_Order_By>>;
  where?: Maybe<Sku_Bool_Exp>;
};

/** aggregated selection of "sku_type" */
export type Sku_Type_Aggregate = {
  __typename?: 'sku_type_aggregate';
  aggregate?: Maybe<Sku_Type_Aggregate_Fields>;
  nodes: Array<Sku_Type>;
};

/** aggregate fields of "sku_type" */
export type Sku_Type_Aggregate_Fields = {
  __typename?: 'sku_type_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Sku_Type_Max_Fields>;
  min?: Maybe<Sku_Type_Min_Fields>;
};

/** aggregate fields of "sku_type" */
export type Sku_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Sku_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "sku_type" */
export type Sku_Type_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Sku_Type_Max_Order_By>;
  min?: Maybe<Sku_Type_Min_Order_By>;
};

/** input type for inserting array relation for remote table "sku_type" */
export type Sku_Type_Arr_Rel_Insert_Input = {
  data: Array<Sku_Type_Insert_Input>;
  on_conflict?: Maybe<Sku_Type_On_Conflict>;
};

/** Boolean expression to filter rows from the table "sku_type". All fields are combined with a logical 'AND'. */
export type Sku_Type_Bool_Exp = {
  SKUs?: Maybe<Sku_Bool_Exp>;
  _and?: Maybe<Array<Maybe<Sku_Type_Bool_Exp>>>;
  _not?: Maybe<Sku_Type_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Sku_Type_Bool_Exp>>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "sku_type" */
export enum Sku_Type_Constraint {
  /** unique or primary key constraint */
  SkuTypePkey = 'sku_type_pkey',
}

export enum Sku_Type_Enum {
  Box = 'BOX',
  Card = 'CARD',
  Case = 'CASE',
  Pack = 'PACK',
}

/** expression to compare columns of type sku_type_enum. All fields are combined with logical 'AND'. */
export type Sku_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Sku_Type_Enum>;
  _in?: Maybe<Array<Sku_Type_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Sku_Type_Enum>;
  _nin?: Maybe<Array<Sku_Type_Enum>>;
};

/** input type for inserting data into table "sku_type" */
export type Sku_Type_Insert_Input = {
  SKUs?: Maybe<Sku_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Sku_Type_Max_Fields = {
  __typename?: 'sku_type_max_fields';
  value?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "sku_type" */
export type Sku_Type_Max_Order_By = {
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Sku_Type_Min_Fields = {
  __typename?: 'sku_type_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "sku_type" */
export type Sku_Type_Min_Order_By = {
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "sku_type" */
export type Sku_Type_Mutation_Response = {
  __typename?: 'sku_type_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Sku_Type>;
};

/** input type for inserting object relation for remote table "sku_type" */
export type Sku_Type_Obj_Rel_Insert_Input = {
  data: Sku_Type_Insert_Input;
  on_conflict?: Maybe<Sku_Type_On_Conflict>;
};

/** on conflict condition type for table "sku_type" */
export type Sku_Type_On_Conflict = {
  constraint: Sku_Type_Constraint;
  update_columns: Array<Sku_Type_Update_Column>;
  where?: Maybe<Sku_Type_Bool_Exp>;
};

/** ordering options when selecting data from "sku_type" */
export type Sku_Type_Order_By = {
  SKUs_aggregate?: Maybe<Sku_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "sku_type" */
export type Sku_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "sku_type" */
export enum Sku_Type_Select_Column {
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "sku_type" */
export type Sku_Type_Set_Input = {
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "sku_type" */
export enum Sku_Type_Update_Column {
  /** column name */
  Value = 'value',
}

/** expression to compare columns of type smallint. All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: Maybe<Scalars['smallint']>;
  _gt?: Maybe<Scalars['smallint']>;
  _gte?: Maybe<Scalars['smallint']>;
  _in?: Maybe<Array<Scalars['smallint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['smallint']>;
  _lte?: Maybe<Scalars['smallint']>;
  _neq?: Maybe<Scalars['smallint']>;
  _nin?: Maybe<Array<Scalars['smallint']>>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Breaks" */
  Breaks: Array<Breaks>;
  /** fetch aggregated fields from the table: "Breaks" */
  Breaks_aggregate: Breaks_Aggregate;
  /** fetch data from the table: "Breaks" using primary key columns */
  Breaks_by_pk?: Maybe<Breaks>;
  /** fetch data from the table: "Events" */
  Events: Array<Events>;
  /** fetch aggregated fields from the table: "Events" */
  Events_aggregate: Events_Aggregate;
  /** fetch data from the table: "Events" using primary key columns */
  Events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "Products" */
  Products: Array<Products>;
  /** fetch aggregated fields from the table: "Products" */
  Products_aggregate: Products_Aggregate;
  /** fetch data from the table: "Products" using primary key columns */
  Products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "Profiles" */
  Profiles: Array<Profiles>;
  /** fetch aggregated fields from the table: "Profiles" */
  Profiles_aggregate: Profiles_Aggregate;
  /** fetch data from the table: "Profiles" using primary key columns */
  Profiles_by_pk?: Maybe<Profiles>;
  /** fetch data from the table: "SKU" */
  SKU: Array<Sku>;
  /** fetch aggregated fields from the table: "SKU" */
  SKU_aggregate: Sku_Aggregate;
  /** fetch data from the table: "SKU" using primary key columns */
  SKU_by_pk?: Maybe<Sku>;
  /** fetch data from the table: "Users" */
  Users: Array<Users>;
  /** fetch aggregated fields from the table: "Users" */
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
  /** fetch data from the table: "sku_type" */
  sku_type: Array<Sku_Type>;
  /** fetch aggregated fields from the table: "sku_type" */
  sku_type_aggregate: Sku_Type_Aggregate;
  /** fetch data from the table: "sku_type" using primary key columns */
  sku_type_by_pk?: Maybe<Sku_Type>;
  /** fetch data from the table: "user_role" */
  user_role: Array<User_Role>;
  /** fetch aggregated fields from the table: "user_role" */
  user_role_aggregate: User_Role_Aggregate;
  /** fetch data from the table: "user_role" using primary key columns */
  user_role_by_pk?: Maybe<User_Role>;
};

/** subscription root */
export type Subscription_RootBreaksArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootBreaks_AggregateArgs = {
  distinct_on?: Maybe<Array<Breaks_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Breaks_Order_By>>;
  where?: Maybe<Breaks_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootBreaks_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootEventsArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Order_By>>;
  where?: Maybe<Events_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootProductsArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProducts_AggregateArgs = {
  distinct_on?: Maybe<Array<Products_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Products_Order_By>>;
  where?: Maybe<Products_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootProfilesArgs = {
  distinct_on?: Maybe<Array<Profiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profiles_Order_By>>;
  where?: Maybe<Profiles_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProfiles_AggregateArgs = {
  distinct_on?: Maybe<Array<Profiles_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profiles_Order_By>>;
  where?: Maybe<Profiles_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProfiles_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootSkuArgs = {
  distinct_on?: Maybe<Array<Sku_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sku_Order_By>>;
  where?: Maybe<Sku_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSku_AggregateArgs = {
  distinct_on?: Maybe<Array<Sku_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sku_Order_By>>;
  where?: Maybe<Sku_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSku_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootBreak_StatusArgs = {
  distinct_on?: Maybe<Array<Break_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Status_Order_By>>;
  where?: Maybe<Break_Status_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootBreak_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Break_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Status_Order_By>>;
  where?: Maybe<Break_Status_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootBreak_Status_By_PkArgs = {
  value: Scalars['String'];
};

/** subscription root */
export type Subscription_RootBreak_TypeArgs = {
  distinct_on?: Maybe<Array<Break_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Type_Order_By>>;
  where?: Maybe<Break_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootBreak_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Break_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Break_Type_Order_By>>;
  where?: Maybe<Break_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootBreak_Type_By_PkArgs = {
  value: Scalars['String'];
};

/** subscription root */
export type Subscription_RootEvent_StatusArgs = {
  distinct_on?: Maybe<Array<Event_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Status_Order_By>>;
  where?: Maybe<Event_Status_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootEvent_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Event_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Status_Order_By>>;
  where?: Maybe<Event_Status_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootEvent_Status_By_PkArgs = {
  value: Scalars['String'];
};

/** subscription root */
export type Subscription_RootSku_TypeArgs = {
  distinct_on?: Maybe<Array<Sku_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sku_Type_Order_By>>;
  where?: Maybe<Sku_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSku_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Sku_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sku_Type_Order_By>>;
  where?: Maybe<Sku_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSku_Type_By_PkArgs = {
  value: Scalars['String'];
};

/** subscription root */
export type Subscription_RootUser_RoleArgs = {
  distinct_on?: Maybe<Array<User_Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Role_Order_By>>;
  where?: Maybe<User_Role_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_Role_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Role_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Role_Order_By>>;
  where?: Maybe<User_Role_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_Role_By_PkArgs = {
  value: Scalars['String'];
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
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

/** columns and relationships of "user_role" */
export type User_Role = {
  __typename?: 'user_role';
  /** An array relationship */
  Users: Array<Users>;
  /** An aggregated array relationship */
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
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Role_Max_Fields>;
  min?: Maybe<User_Role_Min_Fields>;
};

/** aggregate fields of "user_role" */
export type User_Role_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Role_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_role" */
export type User_Role_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<User_Role_Max_Order_By>;
  min?: Maybe<User_Role_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_role" */
export type User_Role_Arr_Rel_Insert_Input = {
  data: Array<User_Role_Insert_Input>;
  on_conflict?: Maybe<User_Role_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_role". All fields are combined with a logical 'AND'. */
export type User_Role_Bool_Exp = {
  Users?: Maybe<Users_Bool_Exp>;
  _and?: Maybe<Array<Maybe<User_Role_Bool_Exp>>>;
  _not?: Maybe<User_Role_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Role_Bool_Exp>>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_role" */
export enum User_Role_Constraint {
  /** unique or primary key constraint */
  UserRolePkey = 'user_role_pkey',
}

export enum User_Role_Enum {
  Admin = 'ADMIN',
  Breaker = 'BREAKER',
  User = 'USER',
}

/** expression to compare columns of type user_role_enum. All fields are combined with logical 'AND'. */
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

/** order by max() on columns of table "user_role" */
export type User_Role_Max_Order_By = {
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Role_Min_Fields = {
  __typename?: 'user_role_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_role" */
export type User_Role_Min_Order_By = {
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_role" */
export type User_Role_Mutation_Response = {
  __typename?: 'user_role_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Role>;
};

/** input type for inserting object relation for remote table "user_role" */
export type User_Role_Obj_Rel_Insert_Input = {
  data: User_Role_Insert_Input;
  on_conflict?: Maybe<User_Role_On_Conflict>;
};

/** on conflict condition type for table "user_role" */
export type User_Role_On_Conflict = {
  constraint: User_Role_Constraint;
  update_columns: Array<User_Role_Update_Column>;
  where?: Maybe<User_Role_Bool_Exp>;
};

/** ordering options when selecting data from "user_role" */
export type User_Role_Order_By = {
  Users_aggregate?: Maybe<Users_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "user_role" */
export type User_Role_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "user_role" */
export enum User_Role_Select_Column {
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "user_role" */
export type User_Role_Set_Input = {
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "user_role" */
export enum User_Role_Update_Column {
  /** column name */
  Value = 'value',
}

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
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

export type ScheduledBreakFragment = { __typename?: 'Breaks' } & Pick<
  Breaks,
  | 'break_type'
  | 'description'
  | 'price'
  | 'spots'
  | 'status'
  | 'title'
  | 'event_id'
> & {
    Event: { __typename?: 'Events' } & Pick<
      Events,
      'id' | 'status' | 'start_time'
    > & {
        User: { __typename?: 'Users' } & Pick<Users, 'id'> & {
            Profile?: Maybe<
              { __typename?: 'Profiles' } & Pick<Profiles, 'image'>
            >;
          };
      };
  };

export type ScheduledBreaksQueryVariables = Exact<{ [key: string]: never }>;

export type ScheduledBreaksQuery = { __typename?: 'query_root' } & {
  Breaks: Array<
    { __typename?: 'Breaks' } & Pick<Breaks, 'id'> & ScheduledBreakFragment
  >;
};

export type NewScheduledBreaksSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type NewScheduledBreaksSubscription = {
  __typename?: 'subscription_root';
} & {
  Breaks: Array<
    { __typename?: 'Breaks' } & Pick<Breaks, 'id'> & ScheduledBreakFragment
  >;
};

export type ScheduledEventFragment = { __typename?: 'Users' } & {
  Events: Array<
    { __typename?: 'Events' } & Pick<
      Events,
      'id' | 'title' | 'status' | 'image' | 'start_time'
    >
  >;
  Profile?: Maybe<
    { __typename?: 'Profiles' } & Pick<
      Profiles,
      'id' | 'image' | 'first_name' | 'last_name'
    >
  >;
};

export type ScheduledEventsQueryVariables = Exact<{ [key: string]: never }>;

export type ScheduledEventsQuery = { __typename?: 'query_root' } & {
  Users: Array<
    { __typename?: 'Users' } & Pick<Users, 'id'> & ScheduledEventFragment
  >;
};

export type NewScheduledEventsSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type NewScheduledEventsSubscription = {
  __typename?: 'subscription_root';
} & {
  Users: Array<
    { __typename?: 'Users' } & Pick<Users, 'id'> & ScheduledEventFragment
  >;
};

export const ScheduledBreakFragmentDoc = gql`
  fragment scheduledBreak on Breaks {
    break_type
    description
    price
    spots
    status
    title
    event_id
    Event {
      id
      status
      start_time
      User {
        id
        Profile {
          image
        }
      }
    }
  }
`;
export const ScheduledEventFragmentDoc = gql`
  fragment scheduledEvent on Users {
    Events(limit: 5, where: { status: { _neq: COMPLETED } }) {
      id
      title
      status
      image
      start_time
    }
    Profile {
      id
      image
      first_name
      last_name
    }
  }
`;
export const ScheduledBreaksDocument = gql`
  query ScheduledBreaks {
    Breaks(
      where: { Event: { status: { _neq: COMPLETED } } }
      order_by: { Event: { start_time: asc } }
    ) {
      id
      ...scheduledBreak
    }
  }
  ${ScheduledBreakFragmentDoc}
`;

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
export function useScheduledBreaksQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ScheduledBreaksQuery,
    ScheduledBreaksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    ScheduledBreaksQuery,
    ScheduledBreaksQueryVariables
  >(ScheduledBreaksDocument, options);
}
export function useScheduledBreaksLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ScheduledBreaksQuery,
    ScheduledBreaksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    ScheduledBreaksQuery,
    ScheduledBreaksQueryVariables
  >(ScheduledBreaksDocument, options);
}
export type ScheduledBreaksQueryHookResult = ReturnType<
  typeof useScheduledBreaksQuery
>;
export type ScheduledBreaksLazyQueryHookResult = ReturnType<
  typeof useScheduledBreaksLazyQuery
>;
export type ScheduledBreaksQueryResult = Apollo.QueryResult<
  ScheduledBreaksQuery,
  ScheduledBreaksQueryVariables
>;
export const NewScheduledBreaksDocument = gql`
  subscription NewScheduledBreaks {
    Breaks(
      where: { Event: { status: { _neq: COMPLETED } } }
      order_by: { Event: { start_time: asc } }
    ) {
      id
      ...scheduledBreak
    }
  }
  ${ScheduledBreakFragmentDoc}
`;

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
export function useNewScheduledBreaksSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    NewScheduledBreaksSubscription,
    NewScheduledBreaksSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    NewScheduledBreaksSubscription,
    NewScheduledBreaksSubscriptionVariables
  >(NewScheduledBreaksDocument, options);
}
export type NewScheduledBreaksSubscriptionHookResult = ReturnType<
  typeof useNewScheduledBreaksSubscription
>;
export type NewScheduledBreaksSubscriptionResult = Apollo.SubscriptionResult<NewScheduledBreaksSubscription>;
export const ScheduledEventsDocument = gql`
  query ScheduledEvents {
    Users(where: { role: { _eq: ADMIN } }) {
      id
      ...scheduledEvent
    }
  }
  ${ScheduledEventFragmentDoc}
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
export function useScheduledEventsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ScheduledEventsQuery,
    ScheduledEventsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    ScheduledEventsQuery,
    ScheduledEventsQueryVariables
  >(ScheduledEventsDocument, options);
}
export function useScheduledEventsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ScheduledEventsQuery,
    ScheduledEventsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    ScheduledEventsQuery,
    ScheduledEventsQueryVariables
  >(ScheduledEventsDocument, options);
}
export type ScheduledEventsQueryHookResult = ReturnType<
  typeof useScheduledEventsQuery
>;
export type ScheduledEventsLazyQueryHookResult = ReturnType<
  typeof useScheduledEventsLazyQuery
>;
export type ScheduledEventsQueryResult = Apollo.QueryResult<
  ScheduledEventsQuery,
  ScheduledEventsQueryVariables
>;
export const NewScheduledEventsDocument = gql`
  subscription NewScheduledEvents {
    Users(where: { role: { _eq: ADMIN } }) {
      id
      ...scheduledEvent
    }
  }
  ${ScheduledEventFragmentDoc}
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
export function useNewScheduledEventsSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    NewScheduledEventsSubscription,
    NewScheduledEventsSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    NewScheduledEventsSubscription,
    NewScheduledEventsSubscriptionVariables
  >(NewScheduledEventsDocument, options);
}
export type NewScheduledEventsSubscriptionHookResult = ReturnType<
  typeof useNewScheduledEventsSubscription
>;
export type NewScheduledEventsSubscriptionResult = Apollo.SubscriptionResult<NewScheduledEventsSubscription>;
