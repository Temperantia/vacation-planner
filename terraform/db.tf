resource "azurerm_cosmosdb_account" "vacation-planner" {
  name                = "vacation-planner"
  location            = "germanywestcentral"
  resource_group_name = azurerm_resource_group.vp-resources.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"
  geo_location {
    location          = "germanywestcentral"
    failover_priority = 0
  }
  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 300
    max_staleness_prefix    = 100000
  }
  depends_on = [
    azurerm_resource_group.vp-resources
  ]
}

resource "azurerm_cosmosdb_sql_database" "main" {
  name                = "default-cosmosdb-sqldb"
  resource_group_name = azurerm_resource_group.vp-resources.name
  account_name        = azurerm_cosmosdb_account.vacation-planner.name
  autoscale_settings {
    max_throughput = 4000
  }
}

resource "azurerm_cosmosdb_sql_container" "example" {
  name                  = "default-sql-container"
  resource_group_name   = azurerm_resource_group.vp-resources.name
  account_name          = azurerm_cosmosdb_account.vacation-planner.name
  database_name         = azurerm_cosmosdb_sql_database.main.name
  partition_key_path    = "/definition/id"
  partition_key_version = 1
  autoscale_settings {
    max_throughput = 4000
  }

  indexing_policy {
    indexing_mode = "consistent"

    included_path {
      path = "/*"
    }

    included_path {
      path = "/included/?"
    }

    excluded_path {
      path = "/excluded/?"
    }
  }

  unique_key {
    paths = ["/definition/idlong", "/definition/idshort"]
  }
}
