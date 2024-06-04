provider "azurerm" {
  features {
    key_vault {
      purge_soft_deleted_secrets_on_destroy = true
      recover_soft_deleted_secrets          = true
    }
  }
}

data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "vp-resources" {
  name     = "vp-resources"
  location = "germanywestcentral"
}
