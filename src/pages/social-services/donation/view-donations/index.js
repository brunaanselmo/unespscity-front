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

const DoacoesLista = (props) => {
  const [totalNaoResolvidos, setTotalNaoResolvidos] = useState(0);
	const [totalResolvidos, setTotalResolvidos] = useState(0);

	useEffect(() => {
		async function getProblems() {
			try {
				const { data } = await api.get('/donations');
				let totalSolicitados = data.length;
				setTotalResolvidos(data.filter((service) => service.isResolved === true).length);
				setTotalNaoResolvidos(totalSolicitados - totalResolvidos);
			}
			catch (e) {
				console.log(e);
			}
		}
		getProblems();
	}, []);	

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
            <h3> Doações informadas e recolhidas: </h3>
            <PagesPieChart
              solved={totalResolvidos}
              unsolved= {totalNaoResolvidos}
            />
       
          </ChartContainer>
        </ContentContainer>

        <Footer />
      </ContainerBase>
    </>
  );
};

export default DoacoesLista;
