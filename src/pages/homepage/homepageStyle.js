// homepageStyle.js

import styled from 'styled-components';

export const Container = styled.div`
  background-color: #3374DB;
  width: 100%;
  height: 10vh;
  justify-content: center;
  align-items: center;
  display: flex;
  box-sizing: border-box;
`;

export const SearchContainer = styled.div`
  width: 75%;
  height: 75%;
  background-color: #FFFFFF;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  height: 90%;
  width: 90%;
  border: none;
  border-radius: 10px;
  font-size: 22px;

  &:focus {
    outline: none;
    border: none;
  }
`;

export const SearchIcon = styled.div`
  margin-left: 60px;
`;

export const ContainerFiltrosCarros = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  margin-left: 15px;
`;

export const ContainerFiltros = styled.div`
  width: 15%;
  height: 100%;
  justify-content: center;
`;

export const ContainerCarros = styled.div`
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const ItemCarro = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 300px;
  height: 450px;
  margin-left: 5%;
  margin-top: 5%;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

export const ImagemCarro = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

export const ModeloCaracteristicas = styled.div`
  display: block;
  width: 100%;
  text-align: left;
`;

export const CadastrarCarro = styled.button`
  width: 100%;
  height: 5%;
  margin-top: 5%;
  border: none;
  background-color: #3374DB;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: #f8f8f8;
  transition: border-bottom 0.3s ease;

  &:focus {
    border-bottom: 2px solid #3498db;
    background-color: #fff;
  }

  &:disabled {
    background-color: #f0f0f0;
    border-bottom: 1px dashed #ccc;
  }

  &::after {
    content: '▼';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 14px;
    color: #555;
  }
`;

export const FiltroField = styled.div`
  padding: 10px;
`;

export const InputTexto = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #000;

  &:focus {
    border: none;
    border-bottom: 2px solid #3498db;
    background-color: #fff;
    outline: none;
  }
`;

export const SearchInputName = styled.input`
  height: 90%;
  width: 90%;
  border: none;
  border-radius: 10px;
  font-size: 22px;

  &:focus {
    outline: none;
    border: none;
  }
`;

export const ButtonCadastrarCarro = styled.button`
    width: 100%;
    height: 5%;
    margin-top: 5%;
    border: none;
    background-color: #3374DB;
    color: white;
    cursor: pointer;
    border-radius: 5px;
`;

export const ButtonRemoverFiltros = styled.button`
    width: 100%;
    height: 5%;
    margin-top: 5%;
    border: none;
    background-color: #3374DB;
    color: white;
    cursor: pointer;
    border-radius: 5px;
`;

export const ButtonFiltrar = styled.button`
    width: 100%;
    height: 5%;
    margin-top: 5%;
    border: none;
    background-color: #3374DB;
    color: white;
    cursor: pointer;
    border-radius: 5px;
`;

export const ContactAndEditButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

export const ButtonAnuncio = styled.button`
    width: 100%;
    height: 40%;
    margin-top: 5%;
    border: none;
    background-color: #3374DB;
    color: white;
    cursor: pointer;
    border-radius: 5px;
`;

export const ButtonModal = styled.button`
    width: 70%;
    height: 30px;
    margin-top: 2%;
    border: none;
    background-color: #3374DB;
    color: white;
    cursor: pointer;
    border-radius: 5px;
`;

export const ButtonDanger = styled.button`
    width: 70%;
    height: 30px;
    margin-top: 2%;
    border: none;
    background-color: red;
    text-align: center;
    color: white;
    cursor: pointer;
    border-radius: 5px;
`;

export const TextError = styled.span`
    color: red;
`;

export const InputTextoLogins = styled.input`
    width: 70%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;

    &:focus{
        border: none;
        border-bottom: 2px solid #3498db;
        background-color: #fff;
        outline: none;
    }
`;

export const DivFieldLogins = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    justify-content: center;
    align-items: center;
`;

export const ContainerLogin = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 80%;
    background-color: white;
    display: flex;
    flex-direction: column;
    z-index: 999;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const Svg = styled.svg`
    cursor: pointer;
`;

export const SelectInputCarro = styled.select`
  width: 70%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: #f8f8f8;
  transition: border-bottom 0.3s ease;

  &:focus {
    border-bottom: 2px solid #3498db;
    background-color: #fff;
  }

  &:disabled {
    background-color: #f0f0f0;
    border-bottom: 1px dashed #ccc;
  }

  &::after {
    content: '▼';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 14px;
    color: #555;
  }
`;

export const ContainerEditarCarro = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 999;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 7%;
`;

export const DivFieldCarros = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const DivSvgCarros = styled.div`
  margin-top: 5%;
`;

export const ModalCadastrarUsuario = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 70%;
height: 70%;
overflow: auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
z-index: 999;
background-color: white;
border-radius: 10px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
padding: 5%;
`;

export const CloseButton = styled.div`
  padding: 10px;
  cursor: pointer;
`;

export const Title = styled.h2`
  margin: 0;
  padding: 10px;
`;

export const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

export const ActionButton = styled.button`
  width: 70%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

