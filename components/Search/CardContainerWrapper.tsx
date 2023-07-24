import { Flex } from "@chakra-ui/react";
import CardContainer from "./CardContainer/CardContainer";
import { FC } from "react";

interface CardContainerWrapperProps {
  showCardContainer: boolean;
  loading: boolean;
}

const CardContainerWrapper: FC<CardContainerWrapperProps> = ({ showCardContainer, loading }) => {
  return (
    <>
      {showCardContainer && !loading && (
        <Flex alignItems="center" justifyContent="center" w="100%" marginTop="300px">
          <CardContainer />
        </Flex>
      )}
    </>
  );
};

export default CardContainerWrapper;