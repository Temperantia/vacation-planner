import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const credential = new DefaultAzureCredential();

const keyVaultName = "vacation-planner-vault";
const url = "https://" + keyVaultName + ".vault.azure.net";

export const vault = new SecretClient(url, credential);
