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
import styles from "./styles.css";

const DoacoesLista = (props) => {

	
		async function getProblems() {
      var elemento_pai = document.getElementsByClassName('divdoacoes')[0];
			try {
				const { data } = await api.get('/donations');
			  console.log(data);
        for ( let i = 0; i < data.length; i++){
          var element = document.createElement('h4');
          element.style.padding = '20px';
          element.style.outline = '1px solid black';
          element.style.borderRadius = '10px';
          var texto = document.createTextNode('Doação:  ' + (i+1) + ' - Endereço:   ' + (data[i].street) + ' - Descrição:   ' + (data[i].description));     
          element.appendChild(texto);
          elemento_pai.appendChild(element);
          console.log(data[i].street);
        }
			}
			catch (e) {
				console.log(e);
			}
		}

		getProblems();
	


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
            <div style= {{ marginTop: "14px", textAlign: "center" }}>
              <div style={{ marginRight: "-20px" }}>
                <Typography variant="h4">Doações Recebidas</Typography>
              </div>
              <DescriptionText>
                Esta página contém todas as doações que foram enviadas e ainda
                não foram recolhidas para serem levadas à instituição desejada.
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
          <ChartContainer> 
          <h3> Doações informadas: </h3>
            <div className="divdoacoes" style = {{ margin: "20px", display: "flex", flexDirection: "column"}}>
        
            </div>

             
          </ChartContainer>
        </ContentContainer>

        <Footer />
      </ContainerBase>
    </>
  );
};

export default DoacoesLista;
