import React from "react";

import { ContainerBase, SubHeader, ContainerColumn, InputAddressContainer, Square, Details } from "./styles";

import Header from "../../../../components/header";
import MiniCard from "../../../../components/mini-card";
import Line from "../../../../components/line";
import ServiceDescription from "../../../../components/service-description";
import Input from "../../../../components/input";
import DescriptionInput from "../../../../components/description-input";
import Button from '../../../../components/form-button';
import Footer from "../../../../components/footer";

const AdminLeishmaniose = () => {
    return (
        <>
            <ContainerBase>
                <Header/>
                <SubHeader>
                    <MiniCard
                        source = "/assets/img/home_controle_pragas.png"
                        titulo = "Controle de Pragas"
                    />
                    <ContainerColumn>
                        <h1> Leishmaniose </h1>
                        <Line />
                    </ContainerColumn>
                </SubHeader>
                <Square>
                    <ServiceDescription 
                        description = "Utilize este serviço para informar a localização de focos do mosquito transmissor da Leishmaniose, o mosquito-palha (Phlebotomus pappatasi)."
                    />
                    <Details>
                        <InputAddressContainer>
                            <Input title="Endereço:" width="36vw"/>
                            <Input title="Nº" width="7vw"/>
                        </InputAddressContainer>
                        <Input title="Ponto de Referência:" placeholder="Opcional"/>
                        <DescriptionInput/>
                        <Button text="Enviar"/>
                    </Details> 
                </Square>
                <Footer/>
            </ContainerBase>
        </>
    )
};
export default AdminLeishmaniose;