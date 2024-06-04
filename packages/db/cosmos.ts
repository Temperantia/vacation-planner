import { vault } from "@repo/vault";
import { CosmosClient } from "@azure/cosmos";

export const client = async () =>
  new CosmosClient({
    endpoint: "https://vacation-planner.documents.azure.com:443/",
    key: (await vault.getSecret("cosmosKey")).value,
  });
