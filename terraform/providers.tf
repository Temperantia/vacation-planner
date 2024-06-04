variable "client_secret" {
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_deleted_secrets_on_destroy = true
      recover_soft_deleted_secrets          = true
    }
  }

  client_id       = "276cd467-4e6b-4211-864d-3937af83ca02"
  client_secret   = var.client_secret
  tenant_id       = "b8c11c68-d479-4859-8b8f-929e92a9e365"
  subscription_id = "40b49098-34a3-4208-bb7f-700c17d8a51a"
}

data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "vp-resources" {
  name     = "vp-resources"
  location = "germanywestcentral"
}
