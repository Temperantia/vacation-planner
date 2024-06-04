provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "vp-resources" {
  name     = "vp-resources"
  location = "germanywestcentral"
}
