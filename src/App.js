import React, { useState } from "react";
import Cards from "react-credit-cards";
import "./App.css";
import "react-credit-cards/es/styles-compiled.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import CreditCardIcon from "@material-ui/icons/CreditCard";

const validation = yup.object({});

const data = [
  { cardNumber: 0, cardExpiry: "", cardOwner: "" },

  {
    cardNumber: 5168757465789576,
    cardExpiry: "02/25",
    cardOwner: "Volodymyr Shabat",
  },
  {
    cardNumber: 5168757463285476,
    cardExpiry: "03/24",
    cardOwner: "VolodymyrShabat Shabat",
  },
];

function App() {
  const [indexCards, setIndexCards] = useState(0);
  const formik = useFormik({
    initialValues: {
      transactionSum: 0,
      senderCard: data[0].cardNumber,
      reciverCard: 0,
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
  });

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(data[indexCards].cardNumber);
        }}
      >
        <h3>Pick sender card</h3>
        <br />
        <center className="Sender">
          <Swiper
            centeredSlides
            pagination
            spaceBetween={10}
            slidesPerView={1}
            // onSwiper={(swiper) => {
            //   console.log(1);
            //   console.log(swiper);
            // }}
            onSlideChange={(e) => {
              console.log(e.realIndex);
              setIndexCards(e.realIndex);
            }}
            value={data[indexCards].cardNumber}
          >
            {data.map((card) => (
              <SwiperSlide
                onChange={() => console.log(1)}
                key={card.cardNumber}
              >
                <Cards
                  number={card.cardNumber}
                  expiry={card.cardExpiry}
                  cardOwner={card.cardOwner}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </center>
        <br />
        <h3>Pick reciever card</h3>
        <br />
        {
          <div className="Reciver">
            <Swiper
              centeredSlides
              pagination
              spaceBetween={10}
              slidesPerView={1}
              defaultValue={1}
              value={formik.values.reciverCard}
            >
              <SwiperSlide>
                <TextField
                  id="transactionSum"
                  name="transactionSum"
                  label={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        spaceBetween: "1%",
                      }}
                    >
                      <CreditCardIcon />
                      <br />
                      <span>Enter reciever card</span>
                    </div>
                  }
                  margin="normal"
                ></TextField>
              </SwiperSlide>
              {data.map((card) => (
                <SwiperSlide key={card.cardNumber}>
                  <Cards
                    number={card.cardNumber}
                    expiry={card.cardExpiry}
                    cardOwner={card.cardOwner}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        }

        <TextField
          id="transactionSum"
          name="transactionSum"
          // value={formik.values.transactionSum}
          // onChange={formik.handleChange}
          label={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                spaceBetween: "1%",
              }}
            >
              <span>Sum</span>
            </div>
          }
          margin="normal"
        ></TextField>
        <br />
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default App;
