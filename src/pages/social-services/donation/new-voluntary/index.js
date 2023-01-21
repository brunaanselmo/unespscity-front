import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FormContainer, InputAddressContainer } from "../styles";
import Header from "../../../../components/header";
import MiniCard from "../../../../components/mini-card";
import Input from "../../../../components/input";
import InputLocalization from "../../../../components/input-localization-button";
import DescriptionInput from "../../../../components/description-input";
import Button from "../../../../components/styled-components/form-button";
import GrayLine from "../../../../components/styled-components/gray-line";
import Footer from "../../../../components/footer";
import Favorites from "../../../../components/favorites";
import Typography from "@mui/material/Typography";
import SolidaryDisposal from "../../../../components/forms/ServiceOrderInformation/solidaryDisposal";
import { ChartContainer } from "../../../../charts/types/donut/chart";
import {
  ContainerBase,
  ContentContainer,
  TopContentContainer,
  DescriptionText,
  MidContentContainer,
} from "../../../../components/styled-components/PageStyles";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { StyledHr } from "../../../../components/styled-components/StyledHr";
import Form from "../../../../components/forms/index";
import ServiceOrderInformation from "../../../../components/forms/ServiceOrderInformation";
import Registry from "../../../../components/forms/ServiceOrderInformation/registry";

const NovoVoluntario = (props) => {
  return (
    <>
      <ContainerBase>
        <Header />
        <ContentContainer>
          <TopContentContainer>
            <MiniCard
              source="/assets/img/home_descarte_solidario.png"
              titulo="Doações"
            />
            <div style={{ marginTop: "14px", textAlign: "center" }}>
              <div style={{ marginRight: "-20px" }}>
                <Typography variant="h4">
                  Cadastro de novo voluntário
                </Typography>
              </div>
              <DescriptionText>
                Nesta página você pode se cadastrar para ser um voluntário para
                recolher as doações recebidas.
              </DescriptionText>
            </div>
            <AiOutlineStar
              style={{
                cursor: "pointer",
                margin: ".8rem",
                stroke: "black",
                strokeWidth: "5",
              }}
              size={25}
            />
            <StyledHr />
            <Registry srcaddress="/newvoluntaries"/>
          </TopContentContainer>
        </ContentContainer>

        <Footer />
      </ContainerBase>
    </>
  );
};

export default NovoVoluntario;
