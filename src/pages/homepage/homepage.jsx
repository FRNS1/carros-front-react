import React, { useState, useEffect } from 'react'
import * as styles from './homepageStyle';
import axios from 'axios';
import Cookies from 'js-cookie'
import LoadingSpinner from './loadingSpinner'


function Homepage() {

    // Controladores de lógica e exibição dos modais
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showCadastroCarro, setShowCadastroCarro] = useState(false);
    const [showEditarCarro, setShowEditarCarro] = useState(false);
    const [showCadastrarUser, setShowCadastrarUser] = useState(false);
    const [logged, setLogged] = useState(false);
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    // Fim

    // Dados
    // Filtros
    const [modeloFiltro, setModeloFiltro] = useState('');
    const [anoFiltro, setAnoFiltro] = useState('');
    const [kmFiltro, setKmFiltro] = useState('');
    const [precoFiltro, setPrecoFiltro] = useState('');
    const [cambioFiltro, setCambioFiltro] = useState('');
    // Fim Filtros
    // Listas
    const [carros, setCarros] = useState([]);
    const [carrosOriginal, setCarrosOriginal] = useState([]);
    // Fim Listas
    // Dados Login
    const [emailLogin, setEmailLogin] = useState('');
    const [senhaLogin, setSenhaLogin] = useState('');
    // Fim dados login
    // Dados Edição ou Cadastro Carro
    const [nomeAnuncio, setNomeAnuncio] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState();
    const [km, setKm] = useState();
    const [motor, setMotor] = useState('');
    const [cambio, setCambio] = useState('');
    const [preco, setPreco] = useState('');
    const [foto, setFoto] = useState('');
    const [fotoFile, setFotoFile] = useState([]);
    // Fim Dados Edição ou Cadastro Carro
    // Dados cadastro de usuário
    const [nomeCad, setNomeCad] = useState('');
    const [emailCad, setEmailCad] = useState('');
    const [senhaCad, setSenhaCad] = useState('');
    // Fim dados cadastro de usuário
    // Fim

    // Funções
    // Cadastro de usuário
    const registerUser = async () => {
        const link = "http://54.208.196.225:5000/users/registeruser";

        const headers = {
            'Content-Type': 'application/json',
        };

        const data = {
            nome: `${nomeCad}`,
            email: `${emailCad}`,
            senha: `${senhaCad}`,
        };

        try {
            const response = await axios.post(link, data, { headers });
            setLoading(true);
            console.log(response.data);
            if (response.data.mensagem === "Usuario criado com sucesso") {
                alert("Usuario criado com sucesso!");
                setShowCadastrarUser(false);
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        } finally {
            setLoading(false);
        }

    }
    // Cadastro de novo carro
    const registerCarro = async () => {
        const link = `http://54.208.196.225:5000/registercarro?token=${Cookies.get('token')}`
        const linkFiles = `http://54.208.196.225:5000/uploadfile?token=${Cookies.get('token')}`
        try {
            setLoading(true);
            let novaFoto = foto;
            if (fotoFile.length >= 1) {
                const formData = new FormData();
                formData.append("file", fotoFile[0]);
                const headers = {
                    'Content-Type': 'multipart/form-data',
                };
                try {
                    const response = await axios.post(linkFiles, formData, { headers });
                    if (response.data.mensagem == 'Arquivo enviado com sucesso') {
                        novaFoto = response.data.dados;
                        console.log(novaFoto);
                        await handleFotoChange(novaFoto);
                        console.log(foto);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            try {
                const headers2 = {
                    'Content-Type': 'application/json',
                };
                console.log('Variavel foto: ', novaFoto)
                const response2 = await axios.post(link, {
                    nome: `${nomeAnuncio}`,
                    marca: `${marca}`,
                    modelo: `${modelo}`,
                    ano: `${ano}`,
                    km: `${km}`,
                    motor: `${motor}`,
                    cambio: `${cambio}`,
                    preco: `${preco}`,
                    foto: `${novaFoto}`,
                    dono_id: Cookies.get('user')
                }, { headers2 })
                if (response2.data.mensagem == 'Carro criado com sucesso') {
                    alert('Carro criado com sucesso')
                    await getCarros();
                    setShowCadastroCarro(false);
                } else {
                    alert('Houve um erro ao criar o carro')
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    // Mudança de foto
    const handleFotoChange = (valor) => {
        setFoto(valor);
    }
    // Atualiza um carro
    const updateCarro = async () => {
        const link = `http://54.208.196.225:5000/updatecarro/${Cookies.get('carroSelecionado')}?token=${Cookies.get('token')}`
        const linkFiles = `http://54.208.196.225:5000/uploadfile?token=${Cookies.get('token')}`
        try {
            setLoading(true);
            let novaFoto = foto;
            if (fotoFile.length >= 1) {
                const formData = new FormData();
                formData.append("file", fotoFile[0]);
                const headers = {
                    'Content-Type': 'multipart/form-data',
                };
                try {
                    const response = await axios.post(linkFiles, formData, { headers });
                    if (response.data.mensagem == 'Arquivo enviado com sucesso') {
                        novaFoto = response.data.dados;
                        console.log(novaFoto);
                        await handleFotoChange(novaFoto);
                        console.log(foto);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            try {
                const headers2 = {
                    'Content-Type': 'application/json',
                };
                console.log('Variavel foto: ', novaFoto)
                const response2 = await axios.put(link, {
                    nome: `${nomeAnuncio}`,
                    marca: `${marca}`,
                    modelo: `${modelo}`,
                    ano: `${ano}`,
                    km: `${km}`,
                    motor: `${motor}`,
                    cambio: `${cambio}`,
                    preco: `${preco}`,
                    foto: `${novaFoto}`
                }, { headers2 })
                if (response2.data.mensagem == 'Carro atualizado com sucesso') {
                    alert('Carro atualizado com sucesso')
                    await getCarros();
                    setShowEditarCarro(false);
                } else {
                    alert('Houve um erro ao editar o carro')
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    // Recupera carro
    const getCarro = async (carro) => {
        const status = openEditCarros();
        await Cookies.set('carroSelecionado', carro);
        if (status == 'logado') {
            const linkCarro = `http://54.208.196.225:5000/getcarro/${carro}`;
            try {
                const response = await axios.get(linkCarro);
                console.log(response.data);
                if (response.data.mensagem == 'Carro encontrado') {
                    if (response.data.dados.dono_id == Cookies.get('user')) {
                        setNomeAnuncio(response.data.dados.ano);
                        setMarca(response.data.dados.marca);
                        setModelo(response.data.dados.modelo);
                        setAno(response.data.dados.ano);
                        setKm(response.data.dados.km);
                        setMotor(response.data.dados.motor);
                        setCambio(response.data.dados.cambio);
                        setPreco(response.data.dados.preco);
                        setFoto(response.data.dados.foto);
                    } else {
                        alert("Você não é o dono deste anúncio, cadastre um veículo para poder edita-lo");
                        setShowEditarCarro(false);
                    }
                } else {
                    alert('Carro não encontrado')
                }
            } catch (error) {
                console.error("Erro ao obter informações do carro:", error);
            }
        } else {
            return
        }
    }
    // Delete carro
    const deleteCarro = async () => {
        const linkCarro = `http://54.208.196.225:5000/deletecarro/${Cookies.get('carroSelecionado')}?token=${Cookies.get('token')}`;
        try {
            const response = await axios.delete(linkCarro);
            console.log(response.data);
            if (response.data.mensagem == 'Carro deletado com sucesso.') {
                alert('Carro deletado com sucesso')
                await getCarros();
                setShowEditarCarro(false);
            }
        } catch (error) {
            console.error("Erro ao deletar carro:", error);
        }
    }
    // Login
    const fazerLogin = async () => {
        try {
            const response = await axios.post("http://54.208.196.225:5000/login", {
                email: emailLogin,
                senha: senhaLogin,
            });
            console.log(response.data);
            if (response.data.mensagem == 'Validacao sucedida') {
                await Cookies.set('token', response.data.token);
                await Cookies.set('user', response.data.user);
                await Cookies.set('logged', true);
                setLogged(true)
                setShowModalLogin(false);
                alert('Login sucedido')
            } else if (response.data.mensagem == 'credenciais incorretas') {
                setErro('BadPassword')
            } else if (response.data.mensagem == 'Usuario nao encontrado') {
                setErro('UserNotFound')
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };
    // Funcionalidade de filtros
    const filtraCarros = async () => {
        console.log(modeloFiltro, anoFiltro, kmFiltro, precoFiltro, cambioFiltro)
        const carrosFiltrados = await carrosOriginal.filter(carro => (
            (modeloFiltro === "" || carro.modelo.includes(modeloFiltro)) &&
            (anoFiltro === "" || carro.ano <= parseInt(anoFiltro)) &&
            (kmFiltro === "" || carro.km <= parseInt(kmFiltro)) &&
            (precoFiltro === "" || carro.preco <= parseInt(precoFiltro)) &&
            (cambioFiltro === "" || carro.cambio === cambioFiltro)
        ));

        await setCarros(carrosFiltrados);
    }

    // Remove filtros
    const removeFiltros = () => {
        setCarros([...carrosOriginal]);
        setModeloFiltro("");
        setAnoFiltro("");
        setKmFiltro("");
        setPrecoFiltro("");
        setCambioFiltro("");
    };

    //Abre o modal de cadastro de carros
    const openCadCarros = () => {
        console.log("Cadastro Carros")
        if (Cookies.get('logged') == 'true') {
            setShowCadastroCarro(true);
        } else {
            setShowModalLogin(true);
        }
    }

    //Abre o modal de edição de carros
    const openEditCarros = () => {
        if (Cookies.get('logged') == 'true') {
            setShowEditarCarro(true);
            return ('logado')
        } else {
            setShowModalLogin(true);
            return ('logando')
        }
    }

    //Recupera todos os carros no banco de dados
    const getCarros = async () => {
        const link = "http://54.208.196.225:5000/getcarros";
        try {
            const response = await axios.get(link);
            console.log(response.data);
            const result = await response.data;
            if (result.mensagem == 'Lista de carros') {
                console.log("Carros encontrados")
                await setCarros(result.dados);
                await setCarrosOriginal(result.dados);
                console.log('carros: ', carros);
            } else {
                console.log("Erro ao coletar os carros")
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    //Formata dinheiro para Reais BRL
    const formatarValorParaReal = (valor) => {
        const opcoesDeFormatacao = {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };

        return valor.toLocaleString('pt-BR', opcoesDeFormatacao);
    }

    useEffect(() => {
        getCarros();
        document.title = 'Carros';
        Cookies.remove('token');
        Cookies.set('logged', false);
        console.log('Limpando cookies')
    }, []);

    // Fim Funções

    return (
        <>
            {loading == true && <LoadingSpinner />}
            <styles.Container>
                <styles.SearchContainer>
                    <styles.SearchInputName
                        className="searchInput"
                        onChange={(e) => {
                            const novoValor = e.target.value;
                            setModeloFiltro(novoValor);

                            if (!novoValor) {
                                removeFiltros();
                            } else {
                                filtraCarros();
                            }
                        }}
                        placeholder="Procure um veículo por nome"
                        id="modeloFiltro"
                    />
                    <styles.SearchIcon>
                        <styles.Svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </styles.Svg>
                    </styles.SearchIcon>
                </styles.SearchContainer>
            </styles.Container>
            <styles.ContainerFiltrosCarros>
                <styles.ContainerFiltros>
                    <styles.ButtonCadastrarCarro onClick={() => openCadCarros()}>
                        Cadastrar novo veículo
                    </styles.ButtonCadastrarCarro>
                    <styles.FiltroField>
                        <label>Filtrar por ano</label>
                        <styles.InputTexto
                            placeholder="Digite o ano do carro que você busca"
                            id="anoFiltro"
                            onChange={async (e) => { await setAnoFiltro(e.target.value) }}
                        />
                    </styles.FiltroField>
                    <styles.FiltroField>
                        <label>Filtrar por km</label>
                        <styles.InputTexto
                            placeholder="Digite a quilometragem máxima do carro que você busca"
                            id="kmFiltro"
                            onChange={async (e) => { await setKmFiltro(e.target.value) }}
                        />
                    </styles.FiltroField>
                    <styles.FiltroField>
                        <label>Filtrar por preço</label>
                        <styles.InputTexto
                            placeholder="Digite o preço máximo do carro que você busca"
                            id="precoFiltro"
                            onChange={async (e) => { await setPrecoFiltro(e.target.value) }}
                        />
                    </styles.FiltroField>
                    <styles.FiltroField>
                        <label>Filtrar por câmbio</label>
                        <styles.SelectInput onChange={async (e) => { await setCambioFiltro(e.target.value) }} id="cambioFiltro">
                            <option value="">Todos</option>
                            <option value="Manual">Manual</option>
                            <option value="Automático">Automático</option>
                        </styles.SelectInput>
                    </styles.FiltroField>
                    <styles.FiltroField>
                        <styles.ButtonFiltrar onClick={() => filtraCarros()}>
                            Filtrar
                        </styles.ButtonFiltrar>
                    </styles.FiltroField>
                    <styles.FiltroField>
                        <styles.ButtonRemoverFiltros onClick={() => removeFiltros()}>
                            Remover Filtros
                        </styles.ButtonRemoverFiltros>
                    </styles.FiltroField>
                </styles.ContainerFiltros>
                <styles.ContainerCarros>
                    {carros.map((carro) => (
                        <styles.ItemCarro>
                            <styles.ImagemCarro src={carro.foto} />
                            <styles.ModeloCaracteristicas>
                                <p className="textoCarro">{`${carro.marca} • ${carro.modelo}`}</p>
                                <p className="textoCarro">{`${carro.ano} • ${carro.km} km • ${carro.motor} • ${carro.cambio}`}</p>
                                <p className="textoCarro">Preço a vista:</p>
                                <p className="textoCarro valorCarro">{formatarValorParaReal(carro.preco)}</p>
                            </styles.ModeloCaracteristicas>
                            <styles.ContactAndEditButtonDiv>
                                <styles.ButtonAnuncio>
                                    <a style={{ color: 'white' }} href={`https://api.whatsapp.com/send?phone=5511948752451&text=Ol%C3%A1%20avaliador%20da%20Verzel%2C%20curtindo%20meu%20teste%3F%20Espero%20que%20sim%20hahaha`}>
                                        Contatar anunciante
                                    </a>
                                </styles.ButtonAnuncio>
                                <styles.ButtonAnuncio onClick={() => getCarro(carro.id)}>
                                    Editar carro
                                </styles.ButtonAnuncio>
                            </styles.ContactAndEditButtonDiv>
                        </styles.ItemCarro>
                    ))}
                </styles.ContainerCarros>
            </styles.ContainerFiltrosCarros>
            {showModalLogin == true && (
                <>
                    <styles.ContainerLogin>
                        <styles.Svg onClick={() => setShowModalLogin(false)}
                            xmlns="http://www.w3.org/2000/svg"
                            height="3em"
                            viewBox="0 0 512 512"
                        >
                            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                        </styles.Svg>
                        <h2>Você precisa logar para editar ou cadastrar um carro</h2>
                        <styles.DivFieldLogins>
                            <label htmlFor="emailLogin">Email</label>
                            <styles.InputTextoLogins
                                placeholder="Digite seu email aqui"
                                id="emailLogin"
                                onChange={(e) => setEmailLogin(e.target.value)}
                            />
                        </styles.DivFieldLogins>
                        <styles.DivFieldLogins>
                            <label htmlFor="senhaLogin">Senha</label>
                            <styles.InputTextoLogins
                                placeholder="Digite sua senha aqui"
                                id="senhaLogin"
                                type="password"
                                onChange={(e) => setSenhaLogin(e.target.value)}
                            />
                        </styles.DivFieldLogins>
                        {erro == "UserNotFound" && (<styles.TextError id="UserNotFound">Usuário não encontrado</styles.TextError>)}
                        {erro == "BadPassword" && (<styles.TextError id="BadPassword">Credenciais incorretas</styles.TextError>)}
                        <styles.ButtonModal onClick={() => fazerLogin()}>Entrar</styles.ButtonModal>
                        <styles.ButtonModal onClick={() => { setShowModalLogin(false); setShowCadastrarUser(true) }}>
                            Não tem um usuário? Cadastre-se aqui!
                        </styles.ButtonModal>
                    </styles.ContainerLogin>
                </>
            )}
            {showCadastroCarro == true && (
                <>
                    <div>
                        <styles.ContainerEditarCarro>
                            <styles.DivSvgCarros>
                                <styles.Svg onClick={() => setShowCadastroCarro(false)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="3em"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                                </styles.Svg>
                            </styles.DivSvgCarros>
                            <styles.DivFieldCarros>
                                <label>Nome do anúncio</label>
                                <styles.InputTextoLogins
                                    placeholder="Digite o nome do seu anúncio"
                                    id="editarNomeCad"
                                    onChange={(e) => setNomeAnuncio(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Marca</label>
                                <styles.InputTextoLogins
                                    placeholder="Digite a marca do seu carro"
                                    id="editarMarcaCad"
                                    onChange={(e) => setMarca(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Modelo</label>
                                <styles.InputTextoLogins
                                    placeholder="Digite o modelo do seu carro"
                                    id="editarModeloCad"
                                    onChange={(e) => setModelo(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Ano</label>
                                <styles.InputTextoLogins
                                    type="number"
                                    placeholder="Digite o ano do seu carro"
                                    id="editarAnoCad"
                                    onChange={(e) => setAno(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Quilometragem</label>
                                <styles.InputTextoLogins
                                    type="number"
                                    step="0.01"
                                    placeholder="Digite a quilometragem do seu carro"
                                    id="editarKmCad"
                                    onChange={(e) => setKm(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Motor</label>
                                <styles.InputTextoLogins
                                    placeholder="Digite o motor do seu carro"
                                    id="editarMotorCad"
                                    onChange={(e) => setMotor(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Câmbio</label>
                                <styles.SelectInputCarro
                                    placeholder="Digite o tipo de câmbio do seu carro"
                                    id="editarCambioCad"
                                    onChange={(e) => setCambio(e.target.value)}
                                >
                                    <option value="Automático">Automático</option>
                                    <option value="Manual">Manual</option>
                                </styles.SelectInputCarro>
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Preço</label>
                                <styles.InputTextoLogins
                                    type="number"
                                    step="0.01"
                                    placeholder="Digite o preço do seu carro"
                                    id="editarPrecoCad"
                                    onChange={(e) => setPreco(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Foto</label>
                                <styles.InputTextoLogins id="fileCad" type="file" onChange={(e) => setFotoFile(e.target.files)} />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <styles.ButtonModal onClick={() => registerCarro()}>Enviar</styles.ButtonModal>
                            </styles.DivFieldCarros>
                        </styles.ContainerEditarCarro>
                    </div>
                </>
            )}
            {showEditarCarro == true && (
                <>
                    <div>
                        <styles.ContainerEditarCarro>
                            <styles.CloseButton>
                                <styles.Svg onClick={() => setShowEditarCarro(false)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="3em"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                                </styles.Svg>
                            </styles.CloseButton>
                            <styles.DivFieldCarros>
                                <label>Nome do anúncio</label>
                                <styles.InputTextoLogins
                                    placeholder="Digite o nome do seu anúncio"
                                    id="editarNomeCad"
                                    value={nomeAnuncio}
                                    onChange={(e) => setNomeAnuncio(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Marca</label>
                                <styles.InputTextoLogins
                                    placeholder="Digite a marca do seu carro"
                                    id="editarMarcaCad"
                                    value={marca}
                                    onChange={(e) => setMarca(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Modelo</label>
                                <styles.InputTextoLogins
                                    placeholder="Digite o modelo do seu carro"
                                    id="editarModeloCad"
                                    value={modelo}
                                    onChange={(e) => setModelo(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Ano</label>
                                <styles.InputTextoLogins
                                    type="number"
                                    placeholder="Digite o ano do seu carro"
                                    id="editarAnoCad"
                                    value={ano}
                                    onChange={(e) => setAno(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Quilometragem</label>
                                <styles.InputTextoLogins
                                    type="number"
                                    step="0.01"
                                    placeholder="Digite a quilometragem do seu carro"
                                    id="editarKmCad"
                                    value={km}
                                    onChange={(e) => setKm(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Motor</label>
                                <styles.InputTextoLogins
                                    placeholder="Digite o motor do seu carro"
                                    id="editarMotorCad"
                                    value={motor}
                                    onChange={(e) => setMotor(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Câmbio</label>
                                <styles.SelectInputCarro
                                    placeholder="Digite o tipo de câmbio do seu carro"
                                    id="editarCambioCad"
                                    value={cambio}
                                    onChange={(e) => setCambio(e.target.value)}
                                >
                                    <option value="Automático">Automático</option>
                                    <option value="Manual">Manual</option>
                                </styles.SelectInputCarro>
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Preço</label>
                                <styles.InputTextoLogins
                                    type="number"
                                    step="0.01"
                                    placeholder="Digite o preço do seu carro"
                                    id="editarPrecoCad"
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <label>Foto</label>
                                <styles.InputTextoLogins id="fileCad" type="file"
                                    onChange={(e) => setFotoFile(e.target.files)} />
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <styles.ButtonModal onClick={(e) => updateCarro()}>Enviar</styles.ButtonModal>
                            </styles.DivFieldCarros>
                            <styles.DivFieldCarros>
                                <styles.ButtonDanger onClick={(e) => deleteCarro()}>Deletar Carro</styles.ButtonDanger>
                            </styles.DivFieldCarros>
                        </styles.ContainerEditarCarro>
                    </div>
                </>
            )}
            {showCadastrarUser == true && (
                <styles.ModalCadastrarUsuario>
                    <styles.CloseButton>
                        <styles.Svg onClick={() => setShowCadastrarUser(false)} xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 512 512">
                            <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                        </styles.Svg>
                    </styles.CloseButton>
                    <styles.Title>Cadastro de usuário</styles.Title>
                    <styles.FieldContainer>
                        <label>Nome Completo</label>
                        <styles.InputTextoLogins onChange={(e) => setNomeCad(e.target.value)} placeholder="Digite seu nome aqui" id="nomeCad" />
                    </styles.FieldContainer>
                    <styles.FieldContainer>
                        <label>Email</label>
                        <styles.InputTextoLogins onChange={(e) => setEmailCad(e.target.value)} placeholder="Digite seu email aqui" id="emailCad" />
                    </styles.FieldContainer>
                    <styles.FieldContainer>
                        <label>Senha</label>
                        <styles.InputTextoLogins onChange={(e) => setSenhaCad(e.target.value)} placeholder="Digite sua senha aqui" id="senhaCad" type="password" />
                    </styles.FieldContainer>
                    <styles.ActionButton onClick={() => registerUser()}>Cadastrar</styles.ActionButton>
                </styles.ModalCadastrarUsuario>
            )}
        </>
    )
}

export default Homepage;