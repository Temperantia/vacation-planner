import { vault } from "@repo/vault";
import Amadeus from "amadeus";

export const POST = async (request: Request) => {
  try {
    const { value: clientId } = await vault.getSecret("amadeusApiKey");
    const { value: clientSecret } = await vault.getSecret("amadeusApiSecret");
    const amadeus = new Amadeus({
      clientId,
      clientSecret,
    });
    const { origin, destination, departure, adults } = await request.json();
    const promises = [
      amadeus.shopping.flightOffersSearch.get({
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: departure,
        adults,
      }),
      amadeus.referenceData.locations.hotels.byCity.get({
        cityCode: destination,
      }),
    ];

    const [flightResponse, hotelResponse] = await Promise.all(promises);
    const hotelIds = hotelResponse.data
      .map(({ hotelId }: any) => hotelId)
      .slice(0, 5)
      .join(",");
    const hotelOfferResponse = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds,
      adults,
    });
    const hotels = hotelOfferResponse.data.map(
      ({
        hotel,
        offers: [
          {
            price: { total },
          },
        ],
      }: any) => ({
        name: hotel.name,
        price: total,
      })
    );

    const flights = flightResponse.data.map(({ itineraries, price }: any) => {
      return {
        price: price.grandTotal,
        itineraries: itineraries.map(({ segments }: any) => {
          return {
            segments: segments.map(
              ({ departure, arrival, carrierCode, number }: any) => ({
                departure,
                arrival,
                carrier: carrierCode + number,
              })
            ),
          };
        }),
      };
    });
    const data = {
      flights,
      hotels,
    };
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
