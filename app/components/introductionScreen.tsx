import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Image from "next/image";

export default function IntroductionScreen() {
  return (
    <div>
      <Box>
        <Stack
          spacing={3}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box>
            {" "}
            <Image
              src="/location-pin.svg"
              width={60}
              height={60}
              alt="Location pin icon"
            />
          </Box>

          <Typography variant="h5" sx={{ color: "#1b2530" }}>
            Quelle destination ?
          </Typography>
          <Typography variant="body1" sx={{ color: "#41566d" }}>
            Recherchez une ville pour afficher la météo qu'il y fait en ce moment.
          </Typography>
        </Stack>
      </Box>
    </div>
  );
}
