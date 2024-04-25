function iniciaDocumento() {
  let doc = new window.BrScanSDKDocumento.Documento({
    chave: "sua-chave",
  });
  doc.preloadModelos(); // Recomendado colocar essa linha de início
  // Tamanho máximo do arquivo em MBs e texto do botão de envio (tela de envio manual de documento 'desktop')
  // doc.tamanhoArquivos = 5;
  // doc.enviarTxt = "Fazer upload";

  // Habilita Captura de Documentos em Desktop
  // doc.capturaEmDesktop = true;
  // Habilita captura manual quando necessário
  // doc.habilitaCapturaManual();
  // Habilita captura manual a partir de uma quantidade de tentativas incorretas
  // doc.qntTentativasCapManual = 0

  // Define o timeout para sair da captura automática para manual
  // doc.timeoutCaptura = 2000;

  // Modifica os documentos aceitos
  // doc.documentosAceitos = ['rg', 'cnh', 'dni', 'cin', 'rne', 'rnm', 'outros', 'cnhdig'];

  // Inicia Wizard
  // doc.wizzard = false;

  // Caso queira trocar a cor dos botões e a fonte do componente, aqui está o exemplo:
  // document.documentElement.style.setProperty('--cor-primary', '#123');
  // document.documentElement.style.setProperty('--font-family', 'Inter');

  // Imagens que são possíveis serem alteradas no componente:
  // doc.imgDicasRetirarPlastico = '';
  // doc.imgDicasFreteEVerso = '';
  // doc.imgDicasEvitarReflexo = '';
  // doc.imgDicasBoaLeitura = '';
  // doc.imgLoading = '';
  // doc.imgErrorDocumento = '';
  // doc.imgTelaModal = '';
  // doc.imgFecharIcone = '';

  // Customização do frame de instrução do upload de documentos físicos:

  // Imagens:
  // doc.imgCameraIcon = '';
  // doc.imgArquivoPng = '';
  // doc.imgEnvieDoisArquivos = '';
  // doc.imgDicasDesktopFreteEVerso = '';

  // Cores:
  // doc.corBotaoTelaDicasDesktop = '';
  // doc.corBackgroundTelaDicasDesktop = '';

  // Textos:
  // doc.nomenclaturasObject.tituloCapturaTelaDicas = " ";
  // doc.nomenclaturasObject.subtituloCapturaTelaDicas = " ";
  // doc.nomenclaturasObject.capturaTelaDicasTexto1 = " ";
  // doc.nomenclaturasObject.capturaTelaDicasTexto2 = " "; 
  // doc.nomenclaturasObject.capturaTelaDicasTexto3 = " ";
  // doc.nomenclaturasObject.capturaTelaDicasTexto4 = " ";
  // doc.nomenclaturasObject.capturaTelaDicasTextoBotao = " ";
  // doc.nomenclaturasObject.selecaoDocTitulo = " ";

  doc
    .iniciaCaptura(document.getElementById('documento'))
    .then(documentos => {
      console.log(documentos);
    })
    .catch(err => {
      console.log(err);
      console.log(err.id, err.desc);
    });
}
document.addEventListener('DOMContentLoaded', function (event) {
  iniciaDocumento();
});