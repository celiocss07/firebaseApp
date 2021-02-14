import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { 
    Container, 
    TypeTitle, 
    TypeDescription, 
    TypeImage, 
    RequestButton,
    RequestButtonText,
    ContainerBox,
    BackgroundButton,
    ContainerBoxDiv,
    style,
    CloseButton,
    CloseButtonText,
    AddButton,
    ContainerBoxBtn,
    AddButtonText,
    ContainerBox2,
    TypeSubTitle
} from './style'

export default function index() {
    return (
        <Container>


            <ScrollView style={{width: '100%'}}>

            <TypeTitle> TERMOS DE USO DO APLICATIVO</TypeTitle>

<ContainerBox>
<TypeDescription>
      Este Termo de Uso contém as “Condições Gerais”, aplicáveis ao uso dos serviços oferecidos pela Soronel, sociedade limitada com Sede na Província de Luanda, na Rua Nicolau Gomes Spencer n° 203, primeiro andar A (Largo primeiro de Maio Luanda), inscrita no Registro de Contribuinte sob o nº 5417572101, doravante denominada simplesmente “Call Taxi”, especificamente para seus clientes corporativos ou privado, que consistem na prestação de serviços de facilitação de chamadas de táxi por meio do aplicativo Call Taxi para celular, de forma a viabilizar e facilitar o contato direto entre o Cliente e o Motorista.
</TypeDescription>
<TypeDescription>
       Toda e qualquer Pessoa, Física ou Jurídica, que se tornar usuário do Aplicativo da Call Taxi declara aceitar estes Termos de Uso:
</TypeDescription>


</ContainerBox>

<ContainerBox>
    <TypeSubTitle> 
       1.OBJETO
    </TypeSubTitle>

    <TypeDescription>
    A Call Táxi consiste em um Aplicativo que otimiza o contato inicial entre "Motoristas" e "Usuários". Pelo aplicativo, a Call Táxi permite que Usuários devidamente cadastrados localizem e contatem motoristas em sua região, para solicitar diretamente e exclusivamente a prestação dos Serviços de Transporte.
    </TypeDescription>
    <TypeDescription>
    Os Motoristas, por sua vez, utilizam o aplicativo como um canal alternativo de contato com Usuários que desejam contratar seus serviços. O contato entre Motoristas e Usuários pode se dar por via chat no aplicativo ou por chamadas telefônicas, sendo que os Usuários podem também optar por enviar sms ou ligar para os Motoristas.
    </TypeDescription>

</ContainerBox>


<ContainerBox>
    <TypeSubTitle> 
    2.PROPRIEDADE INTELECTUAL
    </TypeSubTitle>

    <TypeDescription>
    As marcas, nomes, logotipos, nomes de domínio e demais sinais distintivos, bem como todo e qualquer conteúdo, desenho, arte ou layout publicado nos Aplicativos, são de propriedade exclusiva da <Text style={{fontWeight: 'bold'}}>CALL TÁXI</Text>.
    </TypeDescription>
    <TypeDescription>
    São vedados quaisquer actos ou contribuições tendentes à descompilação, engenharia reversa, modificação das características, ampliação, alteração, mesclagem ou incorporação em quaisquer outros programas ou sistemas. Enfim, toda e qualquer forma de reprodução, total ou parcial, permanente, temporária ou provisória, de forma gratuita ou onerosa, sob quaisquer modalidades, formas ou títulos dos Aplicativos é expressamente vedada.
    </TypeDescription>
        
        

        



</ContainerBox>

<ContainerBox>
    <TypeSubTitle> 
    3.PRESTAÇÃO DO SERVIÇO 
    </TypeSubTitle>

    <TypeDescription>
    O Usuário reconhece que o serviço prestado pelo Aplicativo Call Táxi está sujeito à oferta e disponibilidade de Motoristas para a realização da prestação do serviço de transporte de passageiro individual, considerando a tarifa vigente, a porcentagem de desconto ofertada e a forma de pagamento escolhida.
    </TypeDescription>

    

    

</ContainerBox>

<ContainerBox>
    <TypeSubTitle> 
    4.MENSAGEM DE TEXTO 
    </TypeSubTitle>

    <TypeDescription>
    Ao se cadastrar, o Usuário concorda em receber mensagens ou anúncios a serem divulgadas pela Call Táxi, seja por e-mail, por SMS ou outro meio disponível.
    </TypeDescription>
   

</ContainerBox>



<ContainerBox>
    <TypeSubTitle> 
    5.CADASTRO
    </TypeSubTitle>

    <TypeDescription>
    Os usuários que desejam utilizar os Aplicativos precisam obrigatoriamente preencher os campos de cadastro e fornecer informações válidas e corretas. Seu número de telefone será confirmado pela Call Táxi e, em caso de não confirmação, a utilização dos Aplicativos será bloqueada a exclusivo critério da Call Táxi
    </TypeDescription>
    

        <TypeDescription>
        As informações do cadastro são de exclusiva responsabilidade de quem as inseriu. No caso de acarretarem danos ou prejuízo de qualquer espécie, sanções legais podem ser tomadas pela Call Táxi a fim de resguardar seus interesses e a integridade dos outros usuários do sistema.
        </TypeDescription>

</ContainerBox>

<ContainerBox>
    <TypeSubTitle> 
    6. PAGAMENTO
    </TypeSubTitle>

    <TypeDescription>
        As corridas poderão ser pagas aos Motoristas por meio de moeda corrente nacional. A Call Táxi  poderá disponibilizar a modalidade de pagamento nos seus Aplicativos mediante regras de cadastramento preestabelecidas.
    </TypeDescription>
    

</ContainerBox>

<ContainerBox>
    <TypeSubTitle> 
    7. PROMOÇÕES E DOS DESCONTOS 
    </TypeSubTitle>

    <TypeDescription>
    O Call Táxi poderá, através de regulamento específico de promoções e ou ações de marketing, sozinha ou em parceria com outras empresas e instituições, e a seu livre e exclusivo critério, oferecer promoções ao usuário ou ao Motorista cadastrado no Aplicativo:
    </TypeDescription>
    <ContainerBox style={{paddingLeft:32}}>
        <Text style={{color:'black',marginTop:8}}>
            <Text style={{fontWeight:'bold'}}>•</Text>  As promoções serão oferecidas e geridas pelo próprio Aplicativo, não sendo o Motorista prejudicado ou onerado de qualquer forma e devendo, portanto, realizar as respectivas corridas normalmente. 
        </Text>
        <Text  style={{color:'black',marginTop:8}}>
            <Text style={{fontWeight:'bold'}}>•</Text>   É vedado ao Motorista utilizar promoções em conluio com qualquer outro Usuário ou com terceiros para obter vantagens indevidas. 
        </Text>
        <Text  style={{color:'black',marginTop:8, textAlign: 'justify'}}>
            <Text style={{fontWeight:'bold'}}>•</Text> O Motorista que infringir essa cláusula acima, poderá ter seu contrato de licença de uso de aplicativo suspenso ou resilido.
        </Text>
        <Text  style={{color:'black',marginTop:8, textAlign: 'justify'}}>
            <Text style={{fontWeight:'bold'}}>•</Text> Ao aceitar chamadas com o Modo Desconto, o Motorista deverá atender o Passageiro que as solicite. 
        </Text>
        <Text  style={{color:'black',marginTop:8, textAlign: 'justify'}}>
            <Text style={{fontWeight:'bold'}}>•</Text>  O Motorista aceita que, nessas corridas, o valor final a ser pago pelo Passageiro será calculado com base no valor da corrida indicado pelo aplicativo.
        </Text>
       
        </ContainerBox>
    

</ContainerBox>

<ContainerBox>
    <TypeSubTitle> 
    8.PENALIDADES
    </TypeSubTitle>

    
    <ContainerBox style={{paddingLeft:32}}>
        <Text style={{color:'black',marginTop:8,  textAlign: 'justify'}}>
            <Text style={{fontWeight:'bold'}}>•</Text>  O uso dos Aplicativos Call Táxi de forma indevida em desacordo a estes Termos implicará a exclusão do cadastro do Usuário e a proibição da utilização dos serviços. Seus dados serão preservados para uso das autoridades competentes, caso a Call Táxi seja notificada ou acionada pela violação de direitos de terceiros decorrente do mau uso do sistema.
        </Text>
        <Text  style={{color:'black',marginTop:8, textAlign: 'justify'}}>
            <Text style={{fontWeight:'bold'}}>•</Text>   O Usuário está ciente de que, caso cancele três corridas consecutivas, terá seu cadastro bloqueado por 24 (vinte e quatro) horas para solicitar qualquer táxi utilizando os Aplicativos da Call Táxi.
        </Text>
        <Text  style={{color:'black',marginTop:8, textAlign: 'justify'}}>
            <Text style={{fontWeight:'bold'}}>•</Text> Se o Usuário possuir qualquer pendência relativa a corridas anteriores, não poderá solicitar nova corrida por qualquer meio disponível para tanto, até a regularização do débito.
        </Text>
        
       
        </ContainerBox>
    

</ContainerBox>

<ContainerBox>
    <TypeSubTitle> 
    9. EVENTUAIS FALHAS DO APLICATIVO E DA LIMITAÇÃO DE RESPONSABILIDADE. 
    </TypeSubTitle>

    <TypeDescription>
    A Call Taxi disponibilizará o Aplicativo 24x7, ou seja, 24 horas por dia, 7 dias por semana, contudo, não garante que o Aplicativo estará livre de erros e/ou falhas. 
Eventualmente, o Aplicativo poderá não estar disponível por motivos técnicos ou falhas da internet, ou por qualquer outro motivo de caso fortuito ou de força maior, alheio ao controle da Contratada (<Text style={{color:'rgb(0,160,210)'}}>SOLTEC</Text>). 
    </TypeDescription>

    <TypeDescription>
    A Contratada, contudo, envidará os melhores esforços para manter o Aplicativo no ar durante 24 horas por dia, sem interrupção, salvo a impossibilidade de funcionamento integral e ininterrupto do sistema de telecomunicação ou de informática, por motivos de caso fortuito ou de força maior. 
    </TypeDescription>
    <TypeDescription>
    A Contratada não será responsabilizada por danos ou prejuízos causados ao Usuário em virtude de qualquer interrupção no funcionamento do Aplicativo. 
    </TypeDescription>
    <TypeDescription>
    A Contratada e a Call Táxi não responderão por quaisquer danos ou prejuízos causados ao smartphone ou tablet do Motorista ou de qualquer outro Usuário pelo uso do Aplicativo, inclusive por qualquer vírus que possa atacar o referido equipamento eletrônico em decorrência do acesso, utilização ou navegação na internet ou como consequência da transferência de dados, arquivos, imagens, textos ou áudio. 
    </TypeDescription>
    <TypeDescription>
    A Contratada e a Call Táxi também não serão responsáveis por quaisquer danos, prejuízos ou pela perda de equipamentos do Motorista, ocasionados por condutas de terceiros, caso fortuito ou força maior. 
    </TypeDescription>
    

</ContainerBox>


<ContainerBox>
    <TypeSubTitle> 
    10.CONTACTO
    </TypeSubTitle>

    <TypeDescription>
    Caso reste qualquer dúvida a respeito do conteúdo do presente instrumento, o Usuário ou Motorista deverá entrar em contato por meio do e-mail <Text style={{fontWeight:'bold'}}>comercial@calltaxi.ao</Text> .
    </TypeDescription>
    

</ContainerBox>



            </ScrollView>


        </Container>
    )
}
