"use client";

import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import DateText from "./DateText";

const Hotels = ({ hotels }: any) => (
  <div>
    {hotels.map(({ name, price }: any, index: number) => (
      <Card key={index}>
        <CardContent>
          <Typography variant="h4">{name}</Typography>
          <p>{price}€</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

const Flights = ({ flights }: any) => (
  <Grid container spacing={2}>
    {flights.map(({ price, itineraries }: any, index: number) => (
      <Grid item xs={12} md={6} key={index}>
        <Card key={index}>
          <CardContent>
            <Typography variant="h4">{price}€</Typography>
            {itineraries.map(({ segments }: any, index: number) => (
              <div key={index}>
                {segments.map(
                  ({ departure, arrival, carrier }: any, index: number) => (
                    <div key={index}>
                      <p>
                        {departure.iataCode} <DateText date={departure.at} /> -{" "}
                        {arrival.iataCode} <DateText date={arrival.at} />{" "}
                        with {carrier}
                      </p>
                    </div>
                  )
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const Trips = () => {
  const [data, setData] = useState<any>();
  const today = dayjs().add(1, "day");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const originInput = form.elements.namedItem("origin");
    const destinationInput = form.elements.namedItem("destination");
    const departureInput = form.elements.namedItem("departure");
    const adultsInput = form.elements.namedItem("adults");
    const response = await fetch("/api/vacation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: originInput.value,
        destination: destinationInput.value,
        departure: dayjs(departureInput.value).format("YYYY-MM-DD"),
        adults: adultsInput.value,
      }),
    });
    const data = await response.json();
    setData(data);
  };

  return (
    <>
      <Card>
        <form onSubmit={onSubmit}>
          <TextField label="Origin" name="origin" defaultValue="ARN" required />
          <TextField
            label="Destination"
            name="destination"
            defaultValue="BCN"
            required
          />
          <TextField
            type="number"
            label="Adults"
            name="adults"
            defaultValue={2}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={today} name="departure" />
          </LocalizationProvider>

          <Button type="submit">Ok</Button>
        </form>
      </Card>
      {data && (
        <>
          <Hotels hotels={data.hotels} />
          <Flights flights={data.flights} />
        </>
      )}
    </>
  );
};

export default Trips;
