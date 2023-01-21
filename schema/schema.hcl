schema "public" {
}

table "dogs" {
  schema = schema.public
  column "id" {
    null = false
    type = uuid
    default = sql("gen_random_uuid()")
  }
  column "name" {
    null = false
    type = varchar(100)
  }
  column "isGoodBoy" {
    null = false
    type = boolean
  }
  column "breed" {
    null = false
    type = varchar(100)
  }
  primary_key {
    columns = [column.id]
  }
}
