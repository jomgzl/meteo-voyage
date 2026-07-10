"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import styles from "./loading.module.scss";

export default function Loading() {
  console.log("I am in my suspense");
  return (
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 620,
          p: { sm: 4 },
        }}
        className={`${styles.cardStyle}`}
      >
        <Box>
          <Stack
            direction="row"
            spacing={4}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography variant="h5" sx={{ color: "#1b2530" }}>
              Ville
            </Typography>
            <Image src="/square.svg" width={60} height={60} alt="Square icon" />
          </Stack>
        </Box>

        <Box>
          <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
            <Typography variant="h1" sx={{ color: "#15202b" }}>
              Temp
            </Typography>
            <Typography variant="h6" sx={{ pb: 3, color: "#41566d" }}>
              Description
            </Typography>
          </Stack>
        </Box>
        <Divider variant="middle" sx={{ bgcolor: "#edf1f5" }} />
        <Box>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", mt: 2 }}
            divider={
              <Divider
                orientation="vertical"
                variant="middle"
                sx={{ bgcolor: "#edf1f5" }}
                flexItem
              />
            }
          >
            <Stack sx={{ ml: 2, mr: "auto" }}>
              <Typography sx={{ fontSize: 14, color: "#8a95a3" }}>
                Ressenti
              </Typography>
              <Typography
                sx={{ fontSize: 20, fontWeight: "bold", color: "#1b2530" }}
              >
                Deg °C
              </Typography>
            </Stack>
            <Stack sx={{ ml: 2, mr: "auto" }}>
              <Typography sx={{ fontSize: 14, color: "#8a95a3" }}>
                Humidité
              </Typography>{" "}
              <Typography
                sx={{ fontSize: 20, fontWeight: "bold", color: "#1b2530" }}
              >
                Prc %
              </Typography>
            </Stack>
            <Stack sx={{ ml: 2, mr: "auto" }}>
              <Typography sx={{ fontSize: 14, color: "#8a95a3" }}>
                Vent
              </Typography>{" "}
              <Typography
                sx={{ fontSize: 20, fontWeight: "bold", color: "#1b2530" }}
              >
                Vit km/h
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Card>
  );
}
