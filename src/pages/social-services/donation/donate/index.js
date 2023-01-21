import React, { useState, useEffect } from "react";
import { api } from "../../../../services/api";
import PagesPieChart from "../../../../charts/types/donut";
import Header from "../../../../components/header";
import MiniCard from "../../../../components/mini-card";
import GrayLine from "../../../../components/styled-components/gray-line";
import { ChartContainer } from "../../../../charts/types/donut/chart";
import Footer from "../../../../components/footer";
import Typography from "@mui/material/Typography";
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
import Favorites from "../../../../components/favorites";
import SolidaryDisposal from "../../../../components/forms/ServiceOrderInformation/solidaryDisposal";
import Form from "../../../../components/forms/index";

const NovaDoacao = (props) => {
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
                <Typography variant="h4">Doações</Typography>
              </div>
              <DescriptionText>
                Utilize este serviço para realizar doações para instituições de
                caridade. As doações incluem roupas/calçados, alimentos,
                eletrodométicos, móveis ou similares. O órgão adequado será
                informado automaticamente para fazer o recolhimento no tempo
                hábil mais rápido possível.
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
          </TopContentContainer>
          <MidContentContainer>
            <SolidaryDisposal
              srcaddress="/donations"
              descriptionHelperText="Por favor, 
						informe-nos acima a natureza dos itens a serem descartados. 
						Nos ajudará a acionar o órgão ideal."
            />
          </MidContentContainer>
        </ContentContainer>
        <Footer />
      </ContainerBase>
    </>
  );
};

export default NovaDoacao;
