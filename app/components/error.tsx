import { IError } from "../types/error";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Image from "next/image";

interface IProps extends IError {}

export default function Error({ errorMessage }: IProps) {
  console.log("Erreur:", errorMessage);
  return (
    <Box>
      <Stack
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#e6ebf1",
            width: 60,
            height: 60,
            borderRadius: "100%",
          }}
        >
          {(errorMessage ===
            "Erreur de récupération de données, vérifiez votre connexion internet." && (
            <Image
              src="/cloud-slash.svg"
              width={25}
              height={25}
              alt="Info circle icon"
            />
          )) || (
            <Image
              src="/info-circle.svg"
              width={25}
              height={25}
              alt="Info circle icon"
            />
          )}
        </Box>

        <Typography variant="h5" sx={{ color: "#1b2530" }}>
          {errorMessage}
        </Typography>
      </Stack>
    </Box>
  );
}
