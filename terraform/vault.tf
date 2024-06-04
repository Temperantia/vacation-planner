resource "azurerm_key_vault" "vacation-planner-vault" {
  name                       = "vacation-planner-vault"
  location                   = azurerm_resource_group.vp-resources.location
  resource_group_name        = azurerm_resource_group.vp-resources.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 7

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Create",
      "Get",
    ]

    secret_permissions = [
      "Set",
      "Get",
      "Delete",
      "Purge",
      "Recover"
    ]
  }
}

