import { colorPrimary, error } from "@/constants/Colors";
import { Text } from "react-native";

type ErrorProps = {
  children: string;
};

export default function Error({ children }: ErrorProps) {
  return (
    <Text
      style={{
        marginTop: 20,
        width: "100%",
        padding: 16,
        backgroundColor: error,
        textTransform: "uppercase",
        color: colorPrimary,
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
      }}
    >
      {children}
    </Text>
  );
}
