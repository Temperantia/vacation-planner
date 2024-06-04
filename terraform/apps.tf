resource "azurerm_service_plan" "example" {
  name                = "vp-sp-zipdeploy"
  location            = azurerm_resource_group.vp-resources.location
  resource_group_name = azurerm_resource_group.vp-resources.name
  os_type             = "Linux"
  sku_name            = "F1"
}


resource "azurerm_linux_web_app" "vacation-planner-docs" {
  name                = "vacation-planner-docs"
  location            = azurerm_resource_group.vp-resources.location
  resource_group_name = azurerm_resource_group.vp-resources.name
  service_plan_id     = azurerm_service_plan.example.id

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
  }

  site_config {
    always_on = false
    application_stack {
      docker_image_name   = "vacation-planner-docs"
      docker_registry_url = "https://ghcr.io/temperantia"
    }
  }
}

resource "azurerm_linux_web_app" "vacation-planner-web" {
  name                = "vacation-planner-web"
  location            = azurerm_resource_group.vp-resources.location
  resource_group_name = azurerm_resource_group.vp-resources.name
  service_plan_id     = azurerm_service_plan.example.id

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
  }

  site_config {
    always_on = false
    application_stack {
      docker_image_name   = "vacation-planner-web"
      docker_registry_url = "https://ghcr.io/temperantia"
    }
  }
}
