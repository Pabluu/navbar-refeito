function confirmForm(idForm,msgType,params){
	var oLoading = document.getElementById("loading");
	if (oLoading){
		oLoading.style.display = "block";
		oLoading.style.visibility = "visible";
	}
	var oForm = document.getElementById(idForm);
	if (oForm){
		aFunctions = oForm.getElementsByTagName("input");
		for (var key in aFunctions){
			var objName = aFunctions[key].name;
			var objValue = aFunctions[key].value;
			if (objName == "msgtype"){
				aFunctions[key].value = msgType;
			}
			if (objName == "params"){
				aFunctions[key].value = params;
			}
		}
		oForm.submit();
	}

}
function showProgress(id) {
	var oLoading = document.getElementById("loading");
	if (oLoading){
		console.log("progress: "+id);
		openAjax("index.jsp?&msgtype=getProgress&id="+id,"","loading","",1);
		setTimeout("showProgress('"+id+"')",2000);
		document.body.scrollTop = 0;
	}
}
function imagem_manutencao (text) {
    var c = 0;
    $("div[id]").each(function(){

        console.log("#imagem"+c+"");
        console.log(text);
        $("#imagem"+c+"").replaceWith( " <div id=imagem"+c+" name='imagem' class='divButton' title='IncluirRegistro' onclick=confirmForm('formMenuItem','NovoRegistro','tablename=PONTOELETRONICO')><img src=svg/plus.svg class=imgIconeButton></div><div></div> <br>");
        c++;
    })


}

function funcaoHide() {

		$('#mytable tr').each(function() {
		  	// need this to skip the first row
				var count = 0;
    		var dtDemissao = $(this).find("td:eq(7)").html();
		  	if (dtDemissao != "" && typeof dtDemissao !== "undefined") {
					$(this).toggle();
				}
		});
}

function altera (cod,c, tableName, divName){
    $("#"+divName+""+c+"").replaceWith( "<div id="+divName+""+c+" name='"+divName+"' class='divButton' title='VisualizarRegistro' onclick=windowOpen('VerRegistro','&amp;tablename="+tableName+"&registry="+cod.trim()+"',false);><img src='svg/view.svg' class='imgIconeButton'></div> <br>");
    $("#incluir").replaceWith( "<div type='button' class='divButton' title='Incluir Novo Registro' onclick=windowOpen('NovoRegistro','&amp;tablename="+tableName+"',false);><img src='svg/plus.svg' class='imgIconeButton'> </div><br>");

    //
}

function botoes_Showalt (registries, id_div, tableName, divName) {
    var i = 0;

    var cod = registries.split(",");
    //console.log(cod);
    //cod = cod.value.trim();
    var ids = id_div.split(",");
    while (i<ids.length){
        altera(cod[i],ids[i],tableName, divName);
        i++;
    }


}
function showAltInputs(Texto_div_showAlt,registries,id_div,tableName,divName){
    //tutorial
    //Text_div_showAlt: o texto que vai aparecer no showalt tem que ser no formato: <TEXTO> <div id=divName>
    //registries: registries dos itens q serão deletados ou visualizados
    //id_div: id das divs que serão editadas <STRING> separada por virgula, exemplo: a,b,c,d
    //tableName: nome da tabela
    //divName: nome da div que vai ficar no lugar da div alterada
    var incluir = '<div id="incluir">(se você ver isso entre em contato com o suporte)</div><br>';
    showAlt(incluir+Texto_div_showAlt);
    botoes_Showalt(registries, id_div, tableName, divName);
}
function atualizaFiltroConsultaPadrao(tableName,tableNameRelation,fieldName,idCodigoDestino){
	//var strInputParams = getInputsParams('ConsultaPadraoDialog');
	//console.log(strInputParams);
	//openAjax('index.jsp?'+getFormParams('ConsultaPadraoDialog')+strInputParams+'&tablename='+tableName+'&tablenamerelation='+tableNameRelation+'&fieldname='+fieldName+'&idCodigoDestino='+idCodigoDestino,'','divDialogBody');

	var params = getFormParams('ConsultaPadraoDialog');
	params += getInputsParams('ConsultaPadraoDialog');
	params += '&tablename='+tableName+'&tablenamerelation='+tableNameRelation+'&fieldname='+fieldName+'&idCodigoDestino='+idCodigoDestino;
	openAjax('index.jsp?',params,'divDialogBody');

}
function getObj(id){
	return document.getElementById(id);
}
function changeEmpresa(oSelect,tableName){
	if (oSelect){
		var empresa = oSelect.options[oSelect.selectedIndex].value;
		var oForm = document.getElementById("formMenuItem");
		if (oForm){
			aFunctions = oForm.getElementsByTagName("input");
			for (var key in aFunctions){
				var objName = aFunctions[key].name;
				var objValue = aFunctions[key].value;
				if (objName == "empresa"){
					aFunctions[key].value = empresa;
				}
				if (objName == "params"){
					objValue += "&msgtype=Inicio&changeempresa=sim&tablename="+tableName;
					aFunctions[key].value += objValue;
				}
			}
			oForm.submit();
		}
	}
}
function changeSubmit(oSelect){
	if (oSelect){
		var oForm = document.getElementById("formBusca");
		if (oForm){
			oForm.submit();
		}
	}
}
function goMenuBusca(oInput){
	oDivMenu = document.getElementById("divMenu");
	if (oDivMenu){
		var aSpans = oDivMenu.getElementsByTagName("span");
		for (var key in aSpans){
			var id = aSpans[key].id;
			var oSpan = document.getElementById(id);
			if (oSpan){
				oSpan.style.display = "block";
				oSpan.style.visibility = "visible";
			}
		}
		var aDivs = oDivMenu.getElementsByTagName("div");
		for (var key in aDivs){
			var id = aDivs[key].id;
			var oDivTmp = document.getElementById(id);
			if (oDivTmp){
				if (oInput.value.length > 0){
					if (id.toLowerCase().indexOf(oInput.value.toLowerCase()) >= 0){
						oDivTmp.style.visibility = "visible";
						oDivTmp.style.display = "block";
					} else {
						oDivTmp.style.visibility = "hidden";
						oDivTmp.style.display = "none";
						//console.log(id);
					}
				} else {
					oDivTmp.style.visibility = "visible";
					oDivTmp.style.display = "block";
				}
			}
		}
	}
}
function mask(obj,sMask){

	var sValidChars = "1234567890";
	var sSpecialChars = "-,.()";
	var sValue = obj.value;
	var aResult = new Array();
	var sResult = "";

	// Mask to Array
	for (var i=0;i<sMask.length;i++){
		aResult[i] = sMask.charAt(i);
	}

	// Read Value and play to Array
	var iPosition = 0;
	for (var i=0;i<sValue.length;i++){
		if ((sSpecialChars.indexOf(sValue.charAt(i)) < 0) && sValidChars.indexOf(sValue.charAt(i)) >= 0 ){
			iPosition = aResult.indexOf(" ");
			if (iPosition >= 0){
				aResult[iPosition]=sValue.charAt(i);
			}
		}
	}

	if (aResult.indexOf(" ") < 0){
		iPosition = aResult.length;
	} else {
		iPosition = aResult.indexOf(" ");
	}

	for (var i=0;i<aResult.length;i++){
		sResult += aResult[i];
	}

	obj.value = sResult;

	if (obj.setSelectionRange){
		obj.setSelectionRange(iPosition,iPosition);
	} else if (obj.createTextRange) {
		var range = obj.createTextRange();
		range.collapse(true);
		range.moveEnd('character', iPosition);
		range.moveStart('character', iPosition);
		range.select();
	}

}
function number(obj,decimal){

	obj.style.textAlign = "right";

	var strValue = obj.value;
	obj.title = strValue;

	strValue = replaceAll(strValue,",","");
	strValue = replaceAll(strValue,".","");

	for (var i=0; i<decimal; i++){
		if (strValue.charAt(0) == "0"){
			strValue = strValue.substring(1,strValue.length);
		}
	}

	if (strValue.length <= decimal){
		var strNewValue = "";
		for (var j=strValue.length; j<=decimal; j++)
			strNewValue += "0";
		strValue = strNewValue + strValue;
	}

	strInteiro = strValue.substring(0,strValue.length-decimal);
	//console.log("------------------");
	var newNumber1 = ""; var x = 0;	for (var i=strInteiro.length; i > 0; i--){	x++;	var c = strInteiro.substring(i-1,i); newNumber1 = c + newNumber1; if (x==3 && i != 1){	newNumber1 = "." + newNumber1;	x = 0;	}	}

	strDecimal = strValue.substring(strValue.length-decimal,strValue.length);
	obj.value = newNumber1+','+strDecimal;
}
function viewSpan(id){
	var oObj = document.getElementById(id);
	if (oObj){
		if (oObj.style.display == "none" || oObj.style.display == ""){
			oObj.style.display = "block";
			oObj.style.visibility = "visible";
		} else {
			oObj.style.display = "none";
			oObj.style.visibility = "hidden";
		}
	}
}
function viewSpanMenu(id){
	var oObj = document.getElementById(id);
	if (oObj){
		if (oObj.style.display == "none" || oObj.style.display == ""){
			oObj.style.display = "block";
			oObj.style.visibility = "visible";
			oObj.style.zIndex = "1";
		} else {
			oObj.style.display = "none";
			oObj.style.visibility = "hidden";
		}
	}
}
function setValueToInput(id,codigo,descricao){

	var oCodigo = document.getElementById(id);
	if (oCodigo){
		oCodigo.value = codigo;
		oCodigo.onchange();
	}

	var oDescricao = document.getElementById(id+"_DESC");
	if (oDescricao){
		oDescricao.value = descricao;
	}

}
function mostraConsultaPadraoFiltro(tableName,idSelectFieldName,idCodigoDestino,idDescricaoDestino){
	var oSelectFieldName = document.getElementById(idSelectFieldName);
	if (oSelectFieldName){
		var fieldName = oSelectFieldName.value;
		if (fieldName.indexOf("_") > 0){
			if (fieldName.substring(0,2) == "A_")
				tableName = document.getElementById("tableNameHeader").value;
			fieldName = fieldName.split("_")[1];
		}
		var oObj = document.getElementById("divDialog");
		if (oObj){
				oObj.style.display = "block";
				oObj.style.visibility = "visible";
				oObj.style.top = 100;
				oObj.style.left = 20;
				openAjax("index.jsp?"+getFormParams("ConsultaPadraoDialog")+"&tablename="+tableName+"&fieldname="+fieldName+"&idCodigoDestino="+idCodigoDestino,"","divDialogBody");
		}
	}
}
function getFormParams(msgtype){
	var url = "";
	url += "&msgtype="+msgtype;
	url += "&empresa="+document.getElementById("empresa").value;
	//url += "&params="+document.getElementById("params").value;
	url += "&usuario="+document.getElementById("usuario").value;
	url += "&token="+document.getElementById("token").value;
	url += "&version="+document.getElementById("version").value;
	url += "&hora="+document.getElementById("hora").value;
	return url;
}
function getInputsParams(msgtype){
	var url = "";
	url += "&msgtype="+msgtype;
	url += "&empresa="+document.getElementById("empresa").value;
	url += "&usuario="+document.getElementById("usuario").value;
	url += "&token="+document.getElementById("token").value;
	url += "&version="+document.getElementById("version").value;
	url += "&hora="+document.getElementById("hora").value;

	var aInputs = document.getElementsByTagName("input");
	for (var key in aInputs){
		var objName = aInputs[key].name;
		var objValue = aInputs[key].value;
		url += "&"+objName+"="+objValue;
	}
	var aSelects = document.getElementsByTagName("select");
	for (var key in aSelects){
		var objName = aSelects[key].name;
		var objValue = aSelects[key].value;
		url += "&"+objName+"="+objValue;
	}
	return url;
}
function mostraCalendario(idDivTags,idInput,mes,ano){
	var oObj = document.getElementById("divDialog");
	var oObjBody = document.getElementById("divDialogBody");
	if (oObj){
			oObj.style.display = "block";
			oObj.style.visibility = "visible";
			oObj.style.top = 80;
			oObj.style.left = 20;
			var oidInput = document.getElementById(idInput);
			if (oidInput){
				var html = "";

				var d = new Date();
				mes = (mes == 0) ? d.getMonth()+1 : mes ;
				ano = (ano == 0) ? d.getFullYear() : ano ;
				var anoProximo = ano;
				var mesProximo = mes+1;
				var anoAnterior = ano;
				var mesAnterior = mes-1;
				if ( (mes+1) > 12){
					mesProximo = 1;
					anoProximo = ano + 1;
				}
				if ( (mes-1) < 1){
					mesAnterior = 12;
					anoAnterior = ano - 1;
				}
				var dia = d.getDate();
				var diax = (dia >= 1 && dia <=9) ? "0"+dia : dia ;
				var mesx = new Date().getMonth()+1;
				var anox = new Date().getFullYear();
				mesx = (mesx >= 1 && mesx <=9) ? "0"+mesx : mesx ;
				var vlrDataHoje = diax+"/"+mesx+"/"+anox;

				var descMes = "";
				descMes = (mes == 1) ? "Janeiro" : descMes;
				descMes = (mes == 2) ? "Fevereiro" : descMes;
				descMes = (mes == 3) ? "Março" : descMes;
				descMes = (mes == 4) ? "Abril" : descMes;
				descMes = (mes == 5) ? "Maio" : descMes;
				descMes = (mes == 6) ? "Junho" : descMes;
				descMes = (mes == 7) ? "Julho" : descMes;
				descMes = (mes == 8) ? "Agosto" : descMes;
				descMes = (mes == 9) ? "Setembro" : descMes;
				descMes = (mes == 10) ? "Outubro" : descMes;
				descMes = (mes == 11) ? "Novembro" : descMes;
				descMes = (mes == 12) ? "Dezembro" : descMes;

				html += "<table class='tableCalendar'>";
				html += "<tr>";
				html += "<td class='tdCalendarTitulo' onclick=\"mostraCalendario('"+idDivTags+"','"+idInput+"',"+mesAnterior+","+anoAnterior+");\">&laquo;</td>";
				html += "<td colspan=5 class='tdCalendarTitulo'>"+descMes+"/"+ano+"</td>";
				html += "<td class='tdCalendarTitulo' onclick=\"mostraCalendario('"+idDivTags+"','"+idInput+"',"+mesProximo+","+anoProximo+");\" >&raquo;</td>";
				html += "</tr>";
				html += "</table>";

				html += "<table class='tableCalendar'>";
				html += "<tr>";
				html += "<td class='tdCalendarTitulo'>D</td>";
				html += "<td class='tdCalendarTitulo'>S</td>";
				html += "<td class='tdCalendarTitulo'>T</td>";
				html += "<td class='tdCalendarTitulo'>Q</td>";
				html += "<td class='tdCalendarTitulo'>Q</td>";
				html += "<td class='tdCalendarTitulo'>S</td>";
				html += "<td class='tdCalendarTitulo'>S</td>";
				html += "</tr>";


				var sMes = (mes >= 1 && mes <=9) ? "0"+mes : mes ;

				var d2 = new Date(mes+"/"+"01"+"/"+ano);
				var iniDia = d2.getDay();
				var ultDia = ( mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes ==12 ) ? 31 : 30 ;
				var ultDia = ( mes == 2 ) ? 28 : ultDia ;
				if (ano % 4 == 0 && mes == 2){
					ultDia = 29;
				}

				var x = 0;
				var dx = 0;
				for (var i=0; i<6; i++){
					html += "<tr>";
					for (var j=0; j<7; j++){
						x++;
						if (x > iniDia)
							dx++;
						var sDx = (dx >= 1 && dx <= ultDia) ? dx : "" ;
						var dia = (dx >= 1 && dx <=9) ? "0"+dx : dx ;

						var vlrData = dia+"/"+sMes+"/"+ano;

						var classCalendar = "tdCalendar";
						if (vlrData == vlrDataHoje){
							classCalendar = "tdCalendarHoje";
						}
						if (sDx != ""){
							html += "<td class='"+classCalendar+"' onclick=\"addDataNoCampo('"+idDivTags+"','"+idInput+"','"+vlrData+"')\" >"+sDx+"</td>";
						} else {
							html += "<td class='"+classCalendar+"' >"+sDx+"</td>";
						}
					}
					html += "</tr>";
				}
				html += "</table>";
				oObjBody.innerHTML = html;
			}

	}
}
function mostraMultiValues(idDivTags,idInput,tableName,fieldName){
	var oObj = document.getElementById("divDialog2");
	var oObjBody = document.getElementById("divDialogBody2");
	if (oObj){
			oObj.style.display = "block";
			oObj.style.visibility = "visible";
			oObj.style.top = 80;
			oObj.style.left = 20;
			var oidInput = document.getElementById(idInput);
			if (oidInput){
				openAjax("index.jsp?"+getFormParams("IncluirMultiValor")+'&tablename='+tableName+'&fieldname='+fieldName+'&idDivTags='+idDivTags+'&idInput='+idInput,"","divDialogBody2");
			}

	}
}
function mostraMultiCodigo(idDivTags,idInput,tableName,fieldName){
	var oObj = document.getElementById("divDialog2");
	var oObjBody = document.getElementById("divDialogBody2");
	if (oObj){
			oObj.style.display = "block";
			oObj.style.visibility = "visible";
			oObj.style.top = 80;
			oObj.style.left = 20;
			var oidInput = document.getElementById(idInput);
			if (oidInput){
				openAjax("index.jsp?"+getFormParams("IncluirMultiCodigo")+'&tablename='+tableName+'&fieldname='+fieldName+'&idDivTags='+idDivTags+'&idInput='+idInput,"","divDialogBody2");
			}

	}
}
function fechaCalendario(){
	oObj = document.getElementById("divDialog");
	if (oObj){
		oObj.style.display = "none";
		oObj.style.visibility = "hidden";
	}
}
function fechaDialog(){
	oObj = document.getElementById("divDialog");
	if (oObj){
		oObj.style.display = "none";
		oObj.style.visibility = "hidden";
	}
}
function fechaDialog2(){
	oObj = document.getElementById("divDialog2");
	if (oObj){
		oObj.style.display = "none";
		oObj.style.visibility = "hidden";
	}
}
function fechaDialog3(){
	oObj = document.getElementById("divDialog3");
	if (oObj){
		oObj.style.display = "none";
		oObj.style.visibility = "hidden";
	}
}
function addDataNoCampo(idDiv,idCampo,strData){
	oObj = document.getElementById(idDiv);
	oInput = document.getElementById(idCampo);

	if (oObj && oInput){

		var aValue = oInput.value.split(";");
		for (var i=0; i<aValue.length; i++){
			if (aValue[i] == strData)
				return;
		}

		oObj.innerHTML += "<div id='"+strData+"' class='divTag'>"+strData+"&nbsp;<img class='link' src='imagens/icone_fecha.png' onclick=\"removeDataNoCampo('"+idDiv+"','"+idCampo+"','"+strData+"')\"></div>";
		if (oObj)
			oInput.value += strData + ";";
		else
			oInput.value = strData;
		oInput.dispatchEvent(new Event('change'));
	}
	if (!oObj && oInput){
		oInput.value = strData;
		oInput.dispatchEvent(new Event('change'));
	}
	fechaCalendario();
}
function removeDataNoCampo(idDiv,idCampo,strData){
	var oObj = document.getElementById(idDiv);
	var oInput = document.getElementById(idCampo);
	if (oObj){
		oObj.removeChild(document.getElementById(strData));
	}
	if (oInput){
		if (oObj){
			var result = "";
			var aValue = oInput.value.split(";");
			for (var i=0; i<aValue.length; i++){
				if (aValue[i] != ""){
					if (aValue[i] != strData){
						result += aValue[i] + ";";
					}
				}
			}
			oInput.value = result;
		}
	}
	fechaCalendario();
}
function openAjax(url,param,idPainel,afterFunction,trying){
	var xmlhttp;
	var xmlhttp;
	d = new Date();
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();
	} else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
	    if (xmlhttp.readyState==4){
			var oPainel = document.getElementById(idPainel);
			if (xmlhttp.status==200){
				if (oPainel){
					//console.log("received: "+xmlhttp.responseText);
					oPainel.innerHTML=xmlhttp.responseText;
					if (afterFunction)
						eval(afterFunction);
				}
				var n1 = xmlhttp.responseText.indexOf("<script>");
				var n2 = xmlhttp.responseText.indexOf("</script>");
				if (n1 != -1 && n2 != -1){
					var scriptX = xmlhttp.responseText.substring(n1+8,n2);
					eval(scriptX);
				}
			} else {
				if (trying < 5){
					oPainel.innerHTML="Aguarde...";
					openAjax(url,param,idPainel,afterFunction,trying++);
				} else {
					oPainel.innerHTML="Falha! Verifique conexão!";
				}
			}
		}
	}
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=WINDOWS-1252");
	xmlhttp.send(param);

}
function setToInput(id,vlr){
	var oInput = document.getElementById(id);
	if (oInput){
		oInput.value = vlr;
		oInput.dispatchEvent(new Event('change'));
		oInput.title = vlr;
	}
}
function onChangeSelectShowIf(oSelect,value,idShow,idHidden){
	oShow = document.getElementById(idShow);
	oHidden = document.getElementById(idHidden);
	if (oSelect.value == value){
		if (oShow){
			oShow.style.display = "block";
			oShow.style.visibility = "visible";
		}
		if (oHidden){
			oHidden.style.display = "none";
			oHidden.style.visibility = "hidden";
		}
	} else {
		if (oShow){
			oShow.style.display = "none";
			oShow.style.visibility = "hidden";
		}
		if (oHidden){
			oHidden.style.display = "block";
			oHidden.style.visibility = "visible";
		}

	}
}
function setEnableFieldName(idFieldOrigem,idFieldDestino,valueCondition){
	oOrigem = document.getElementById(idFieldOrigem);
	oDestino = document.getElementById(idFieldDestino);
	if (oOrigem && oDestino){
		var found = false;
		var aValues = valueCondition.split(";");
		for (var i=0; i<aValues.length; i++){
			var value = aValues[i];
			if (value == oOrigem.value)
				found = true;
		}
		if (found){
			oDestino.disabled = false;
			oDestino.className = "inputPadrao"
		} else {
			oDestino.disabled = true;
			oDestino.className = "inputDisabled"
		}
	}
}
function setEditableFieldName(idFieldOrigem,idFieldDestino,valueCondition){
	oOrigem = document.getElementById(idFieldOrigem);
	oDestino = document.getElementById(idFieldDestino);
	if (oOrigem && oDestino){
		var found = false;
		var aValues = valueCondition.split(";");
		for (var i=0; i<aValues.length; i++){
			var value = aValues[i];
			if (value == oOrigem.value)
				found = true;
		}
		if (found){
			oDestino.readOnly = false;
			oDestino.className = "inputPadrao"
		} else {
			oDestino.readOnly = true;
			oDestino.className = "inputDisabled"
		}
	}
}
function onChangeFormaPagto(){

	var oQtdLines = document.getElementById("PEDIDOPAGTO__QTDLINES");
	var oTotVlrTotal = document.getElementById("TOTAL__PEDIDOPAGTO__VLRTOTAL");
	var oTotQtdParc = document.getElementById("TOTAL__PEDIDOPAGTO__QTDPARC");
	var nTotQtdParc = 0;
	var nTotVlrTotal = 0;

	if (oQtdLines){
		var max = parseInt(oQtdLines.value);
		for (var i=1; i<=max; i++){
			var oFormaPagto = document.getElementById("PEDIDOPAGTO__FORMAPAGTO__"+i);
			var oQtdParcelas = document.getElementById("PEDIDOPAGTO__QTDPARC__"+i);
			var oVlrParcela = document.getElementById("PEDIDOPAGTO__VLRPARCELA__"+i);
			var oVlrTotal = document.getElementById("PEDIDOPAGTO__VLRTOTAL__"+i);
			if (oFormaPagto.value == "AV"){
				oQtdParcelas.value = "1";
				oQtdParcelas.readOnly = true;
				oQtdParcelas.className = "inputNumberDisabled";

				oVlrParcela.readOnly = true;
				oVlrParcela.className = "inputNumberDisabled";

				iQtdParcela = parseInt(oQtdParcelas.value);
				nVlrParcela = parseNumberToDouble(oVlrParcela.value);
				nVlrTotal = parseNumberToDouble(oVlrTotal.value);
				nTotVlrTotal += nVlrTotal;
				oVlrParcela.value = parseDoubleToNumber(nVlrTotal);
			}
			if (oFormaPagto.value == "PC"){
				oQtdParcelas.readOnly = false;
				oQtdParcelas.className = "inputNumber";

				iQtdParcela = parseInt(oQtdParcelas.value);
				nVlrParcela = parseNumberToDouble(oVlrParcela.value);
				nVlrTotal = parseNumberToDouble(oVlrTotal.value);
				nTotVlrTotal += nVlrTotal;

				if (iQtdParcela > 0){
					nVlrParcela = nVlrTotal / iQtdParcela;
					oVlrParcela.value = parseDoubleToNumber(nVlrParcela);
				}

			}
			nTotQtdParc += iQtdParcela;
		}
		if (oTotVlrTotal && oTotQtdParc){
			oTotVlrTotal.value = parseDoubleToNumber(nTotVlrTotal);
			oTotQtdParc.value = parseDoubleToNumber(nTotQtdParc);
		}
	}

}
function onChangeFormaPagtoNF(){
	var tableName = "NOTAFISCALPAGTO";
	var oQtdLines = document.getElementById(tableName+"__QTDLINES");
	var oTotVlrTotal = document.getElementById("TOTAL__"+tableName+"__VLRTOTAL");
	var oTotQtdParc = document.getElementById("TOTAL__"+tableName+"__QTDPARC");
	var nTotQtdParc = 0;
	var nTotVlrTotal = 0;

	if (oQtdLines){
		var max = parseInt(oQtdLines.value);
		for (var i=1; i<=max; i++){
			var oFormaPagto = document.getElementById(tableName+"__FORMAPAGTO__"+i);
			var oQtdParcelas = document.getElementById(tableName+"__QTDPARC__"+i);
			var oVlrParcela = document.getElementById(tableName+"__VLRPARCELA__"+i);
			var oVlrTotal = document.getElementById(tableName+"__VLRTOTAL__"+i);
			if (oFormaPagto.value == "AV"){
				oQtdParcelas.value = "1";
				oQtdParcelas.readOnly = true;
				oQtdParcelas.className = "inputNumberDisabled";

				oVlrParcela.readOnly = true;
				oVlrParcela.className = "inputNumberDisabled";

				iQtdParcela = parseInt(oQtdParcelas.value);
				nVlrParcela = parseNumberToDouble(oVlrParcela.value);
				nVlrTotal = parseNumberToDouble(oVlrTotal.value);
				nTotVlrTotal += nVlrTotal;
				oVlrParcela.value = parseDoubleToNumber(nVlrTotal);
			}
			if (oFormaPagto.value == "PZ"){
				oQtdParcelas.readOnly = false;
				oQtdParcelas.className = "inputNumber";

				iQtdParcela = parseInt(oQtdParcelas.value);
				nVlrParcela = parseNumberToDouble(oVlrParcela.value);
				nVlrTotal = parseNumberToDouble(oVlrTotal.value);
				nTotVlrTotal += nVlrTotal;

				if (iQtdParcela > 0){
					nVlrParcela = nVlrTotal / iQtdParcela;
					oVlrParcela.value = parseDoubleToNumber(nVlrParcela);
				}

			}
			nTotQtdParc += iQtdParcela;
		}
		if (oTotVlrTotal && oTotQtdParc){
			oTotVlrTotal.value = parseDoubleToNumber(nTotVlrTotal);
			oTotQtdParc.value = parseDoubleToNumber(nTotQtdParc);
		}
	}

}

function onChangeCalcTotal(fieldNameQuantidade,fieldNamePreco,fieldNameTotal){
	var oQuantidade = document.getElementById(fieldNameQuantidade);
	var oPreco = document.getElementById(fieldNamePreco);
	var oTotal = document.getElementById(fieldNameTotal);

	var iQuantidade = parseInt(oQuantidade.value);
	var nVlrPreco = parseNumberToDouble(oPreco.value);
	var nVlrTotal = parseNumberToDouble(oTotal.value);

	nVlrTotal = iQuantidade * nVlrPreco;

	oTotal.value = parseDoubleToNumber(nVlrTotal);
}
function multiplica(fieldValor,fieldMultiplicador,fieldResultado){
	var strValor = document.getElementById(fieldValor).value;
	var strMultiplicador = document.getElementById(fieldMultiplicador).value;
	var strResultado = document.getElementById(fieldResultado).value;
	var nResultado = (parseInt(strValor) * parseNumberToDouble(strMultiplicador));
	document.getElementById(fieldResultado).value = parseDoubleToNumber(nResultado,2);
}
function multiplicaItem(tableNameItem,fieldValor,fieldMultiplicador,fieldResultado){
	var oQtdLines = document.getElementById(tableNameItem+"__QTDLINES");
	var nTotal = 0;
	if (oQtdLines){
		var max = parseInt(oQtdLines.value);
        var oRow = document.getElementById("tr"+tableNameItem+"__"+(max-1));
		for (var i=1; i<=max; i++){
			var oChk = document.getElementById(tableNameItem+"__CHK__"+i);
			if (oChk.value != "true")
				continue;

			var oValor = document.getElementById(tableNameItem+"__"+fieldValor+"__"+i);
			var oMultiplicador = document.getElementById(tableNameItem+"__"+fieldMultiplicador+"__"+i);
			var oResultado = document.getElementById(tableNameItem+"__"+fieldResultado+"__"+i);
			if (oValor && oMultiplicador && oResultado){
				var nResultado = (parseInt(oValor.value) * parseNumberToDouble(oMultiplicador.value));
				oResultado.value = parseDoubleToNumber(nResultado,2);
			}
            var inputs = oRow.getElementsByTagName("input");
            for (i=0;i<inputs.length;i++){
                var aId2 = inputs[i].id.split("__");
                if (aId2.length == 3){
                    calcTotal(tableNameItem,aId2[1]);
                }
            }
		}
	} else {
		var oValor = document.getElementById(fieldValor);
		var oMultiplicador = document.getElementById(fieldMultiplicador);
		var oResultado = document.getElementById(fieldResultado);
		if (oValor && oMultiplicador && oResultado){
			var nResultado = (parseInt(oValor.value) * parseNumberToDouble(oMultiplicador.value));
			oResultado.value = parseDoubleToNumber(nResultado,2);
		}
	}
}
function getValueById(id){
	var o = document.getElementById(id);
	if (o){
		return o.value;
	}
	return "";
}
function setValueTo(idDestino,tableName,fieldName,value,afterFunction){
	getValueByAjax3(idDestino,tableName,fieldName,value,"document.getElementById('"+idDestino+"').onkeyup()");
}

function parseStringToJson(str){
	var aStr = str.split(",");
	var json = "[";
	for (var i=0; i<aStr.length; i++){
		var aLoc = aStr[i].split(" ");
		if (aLoc.length == 2){
			json += "{lat:"+aLoc[0]+",lng:"+aLoc[1]+"},";
		}
	}
	json = json.substring(0,json.length-1);
	json += "]";
	var oJson = eval(json);
	return oJson;
}
function calcPoligonArea(aDados){
	aDados = parseLocationsToInt(aDados);
	var aTot = [0,0];
	if (aDados.length == 0)
		return 0;

	for (var i=0; i<aDados.length; i++){
		if ((i+1) < aDados.length){
			aTot[0] +=  aDados[i].lat * aDados[i+1].lng;
			aTot[1] +=  aDados[i].lng * aDados[i+1].lat;
		}
	}
	aTot[0] +=  aDados[aDados.length-1].lat * aDados[0].lng;
	aTot[1] +=  aDados[aDados.length-1].lng * aDados[0].lat;
	var total = aTot[1]-aTot[0];
	total = (total < 0) ? total*-1 : total ;
	return (total/2);
}
function parseM2ToHectare(vlr){
	var vlr = vlr * 0.0001;
	return parseDoubleToNumber(vlr);
}
function parseLocationsToInt(aDados){
	for (var i=0; i<aDados.length; i++){
		aDados[i].lat = parseLocationToInt(aDados[i].lat);
		aDados[i].lng = parseLocationToInt(aDados[i].lng);
	}
	return aDados;
}
function parseLocationToInt(location){
	var max = 5;
	var str = location.toString();
	var aLoc = str.split(".");

	var sPrefix = "0";
	var sLoc = "0";
	if (aLoc.length == 2){
		sPrefix = aLoc[0];
		sLoc = aLoc[1];
	} else {
		sPrefix = str;
	}

	if (sLoc.length > max)
		sLoc = sLoc.substring(0,max);
	else {
		var size = sLoc.length;
		for (var i=0; i<(max-size); i++)
			sLoc = sLoc + "0";
	}
	var result = sPrefix+sLoc;
	return parseStringToFloat(result);
}
function delTableRow(tableName,idTr){
	var oTable = document.getElementById("table"+tableName);
	var oRow = document.getElementById(idTr);
	if (oTable && oRow){
		var aId = idTr.split("__");
		if (aId.length == 2){
			var nro = aId[1];
			//if (nro != 1){
				var oCheckbox = document.getElementById(tableName+"__CHK__"+nro);
				oCheckbox.value = "false";
				oRow.style.display = "none";
				oRow.style.visibility = "hidden";
				//oTable.deleteRow(nro);
			//}
		}
		var inputs = oRow.getElementsByTagName("input");
		for (i=0;i<inputs.length;i++){
			var aId2 = inputs[i].id.split("__");
			if (aId2.length == 3){
				calcTotal(tableName,aId2[1]);
			}
		}
	}
	if (tableName == "NOTAFISCALITEM")
		calcNotaFiscalItem();
	if (tableName == "GUIAESTOQUERESULTADO")
		calcGuiaEstoqueItem();
}
function addNewTableRow(tableName){
		var oTable = document.getElementById("table"+tableName);
		if (oTable){
			var oRows = oTable.getElementsByTagName("tr");
			var iNro = oTable.rows.length-2;
			if (iNro > 0){
				var oRowTop = document.getElementById("tr"+tableName+"__999");
				var oRow = document.createElement("tr");
				oRow.innerHTML = oRowTop.innerHTML;
				oRow.id = "tr"+tableName+"__"+(iNro+1);

				var oInputs = oRow.getElementsByTagName("input");
				for (i = 0; i < oInputs.length; i++) {
					var idTmp = oInputs[i].id;
					var aIdTmp = idTmp.split("__");
					if (aIdTmp.length == 3){
						var fieldname = aIdTmp[1];
						oRow.innerHTML = replaceAll(oRow.innerHTML,tableName+"__999",tableName+"__"+(iNro+1));
						oRow.innerHTML = replaceAll(oRow.innerHTML,tableName+"__"+fieldname+"__999",tableName+"__"+fieldname+"__"+(iNro+1));
					}
				}
				var oSelects = oRow.getElementsByTagName("select");
				for (i = 0; i < oSelects.length; i++) {
					var idTmp = oSelects[i].id;
					var aIdTmp = idTmp.split("__");
					if (aIdTmp.length == 3){
						var fieldname = aIdTmp[1];
						oRow.innerHTML = replaceAll(oRow.innerHTML,tableName+"__999",tableName+"__"+(iNro+1));
						oRow.innerHTML = replaceAll(oRow.innerHTML,tableName+"__"+fieldname+"__999",tableName+"__"+fieldname+"__"+(iNro+1));
					}
				}
				iNro += 1;
				document.getElementById(tableName+"__QTDLINES").value = iNro;
				oTable.appendChild(oRow);
				document.getElementById(tableName+"__CHK__"+iNro).value = "true";
				document.getElementById(tableName+"__CODIGO__"+iNro).value = "";

				var oInputs = oRow.getElementsByTagName("input");
				for (i = 0; i < oInputs.length; i++) {
					var idTmp = oInputs[i].id;
					var aIdTmp = idTmp.split("__");
					if (aIdTmp.length == 3 && oInputs[i].type != "hidden"){
						if (oInputs[i].dataset.typex == "INT"){
							oInputs[i].value = "0";
						} else if (oInputs[i].dataset.typex == "DECIMAL"){
							var maxZero = oInputs[i].dataset.decimalx;
							if (maxZero > 2){
								var valueTmp = "0,";
								for (var d=0; d<maxZero; d++){
									valueTmp += "0";
								}
								oInputs[i].value = valueTmp;
							} else {
								oInputs[i].value = "0,00";
							}
						} else {
							oInputs[i].value = "";
						}
					}
				}

				var oDivs = oRow.getElementsByTagName("div");
				for (i = 0; i < oDivs.length; i++) {
					//console.log(oDivs[i].id);
					if (oDivs[i].id.indexOf("divInputTagsBody__") !=-1)
						oDivs[i].innerHTML = "";
				}

				var oItem = document.getElementById(tableName+"__ITEM__"+iNro);
				if (oItem){
					if (iNro < 100)
						oItem.value = "0"+iNro;
					if (iNro < 10)
						oItem.value = "00"+iNro;
				}
			}

			var oDtRegistro = document.getElementById(tableName+"__DTREGISTRO__"+iNro);
			var oHrRegistro = document.getElementById(tableName+"__HRREGISTRO__"+iNro);
			if (oDtRegistro)
				oDtRegistro.value = getData();
			if (oHrRegistro)
				oHrRegistro.value = getHora();

		}
		if (tableName == "AMOSTRAXTIPOTORRA")
			calcAmostraTipoTorra();
		if (tableName == "NOTAFISCALITEM")
			calcNotaFiscalItem();
		if (tableName == "GUIAESTOQUERESULTADO")
			calcGuiaEstoqueItem();
		if (tableName == "GUIAAMOSTRADESPEJO")
			onChangeGSA();
		if (tableName == "GUIAAMOSTRARESERVA")
			onChangeGSA();
		if (tableName == "GUIAAMOSTRARESULTADO")
			onChangeGSA();
}
function replaceAll(str, needle, replacement) {
    return str.split(needle).join(replacement);
}
function validaHora(oInput){
	var ok = true;
	var aValue = oInput.value.split(":");
	if (aValue.length == 2){
		if (aValue[0].trim().length != 2 || aValue[1].trim().length != 2 )
			ok = false;
		if (parseInt(aValue[0]) > 23 || parseInt(aValue[1]) > 59)
			ok = false;
	} else {
		ok = false;
	}
	if (!ok){
		oInput.value = "00:00";
	}
}
function somaDiasNaData(iDias,idData){
	var oData = document.getElementById(idData);
	if (oData){
		var result = new Date();
		result.setDate(result.getDate() + parseInt(iDias));
		var dia = result.getDate();
		var mes = result.getMonth()+1;
		var ano = result.getFullYear();

		var sDia = (dia < 10) ? "0"+dia.toString() : dia.toString() ;
		var sMes = (mes < 10) ? "0"+mes.toString() : mes.toString() ;

 		var x = sDia+"/"+sMes+"/"+ano;
		oData.value = x;
	}
}
function somaDiasNaData2(iDias,idDataIni,idData){
	var oDataIni = document.getElementById(idDataIni);
	var oData = document.getElementById(idData);
	if (oDataIni && oData && oDataIni.value.length >= 10){
		var ano = oDataIni.value.substring(6,10);
		var mes = oDataIni.value.substring(3,5);
		var dia = oDataIni.value.substring(0,2);
		var dtIni = new Date(ano,parseInt(mes)-1,dia);
		dtIni.setDate(dtIni.getDate() + parseInt(iDias));
		var dia = dtIni.getDate();
		var mes = dtIni.getMonth()+1;
		var ano = dtIni.getFullYear();

		var sDia = (dia < 10) ? "0"+dia.toString() : dia.toString() ;
		var sMes = (mes < 10) ? "0"+mes.toString() : mes.toString() ;

 		var x = sDia+"/"+sMes+"/"+ano;
		oData.value = x;
	}
}
function calcQtdTanque(){
	var oVazao = document.getElementById("VAZAO");
	var oCpTanque = document.getElementById("CAPACIDADETANQUE");
	var oQtdHas = document.getElementById("QTDHAS");
	var oQtdHasApl = document.getElementById("QTDHASAPL");
	var oQtdLinesProd = document.getElementById("MACROTAREFAXPRODUTO__QTDLINES");
	var oQtdLinesTalhao = document.getElementById("MACROTAREFAXTALHAO__QTDLINES");
	var oPorcent = document.getElementById("PORCENT"); // faixa

	if (oVazao && oCpTanque && oQtdHas && oQtdLinesProd){
		var strProdutos = "";
		var strTalhoes = "";
		var max = parseInt(oQtdLinesProd.value);
		var maxTal = parseInt(oQtdLinesTalhao.value);
		var nQtdHasTot = 0.00;
		for (var i=1; i<=maxTal; i++){
			var visivel = document.getElementById("trMACROTAREFAXTALHAO__"+i);
			if(visivel.style.visibility != 'hidden'){
				oQTDHAS_MXT = document.getElementById("MACROTAREFAXTALHAO__QTDHAS__"+i);
				oPorcent_MXT = document.getElementById("MACROTAREFAXTALHAO__PORCENTAGEM__"+i);
				nQtdHasTot += parseNumberToDouble(document.getElementById("MACROTAREFAXTALHAO__QTDHASAPL__"+i).value);
				if (document.getElementById("MACROTAREFAXTALHAO__QTDHASAPL__"+i).value == 0){
					nQtdHasTot += parseNumberToDouble(oQTDHAS_MXT.value) * parseNumberToDouble(oPorcent_MXT.value);
				}
			}

		}
		for (var i=1; i<=max; i++){
			var oProduto = document.getElementById("MACROTAREFAXPRODUTO__PRODUTO__"+i);
			var oDosagem = document.getElementById("MACROTAREFAXPRODUTO__DOSAGEM__"+i);
			var oQtdTanque = document.getElementById("MACROTAREFAXPRODUTO__QTDTANQUE__"+i);
			var oQtdPrev = document.getElementById("MACROTAREFAXPRODUTO__QTDPREV__"+i);


			strProdutos += oProduto.value+",";
			var nPorcent = parseNumberToDouble(oPorcent.value);
			var nVazao = parseNumberToDouble(oVazao.value);
			var nCpTanque = parseNumberToDouble(oCpTanque.value);
			var nDosagem = parseNumberToDouble(oDosagem.value);
			var nQtdTanque = parseNumberToDouble(oQtdTanque.value);
			var nQtdHas = parseNumberToDouble(oQtdHas.value);

			if(nQtdHasTot > 0){
				nQtdHas = nQtdHasTot;
			}

			if (nPorcent > 100){
				nPorcent = 100;
				oPorcent.value = parseDoubleToNumber(nPorcent);
			}

			if (nVazao > 0){
				//var nHect = (nCpTanque/nVazao)/(nPorcent/100);
				var nHect = (nCpTanque/nVazao);
				nQtdTanque = nDosagem * nHect;
				oQtdTanque.value = parseDoubleToNumber(nQtdTanque);
			}
			if(nQtdHasTot > 0){
				oQtdPrev.value = parseDoubleToNumber((nDosagem * nQtdHas));
			} else {
				oQtdPrev.value = parseDoubleToNumber((nDosagem * nQtdHas) * (nPorcent/100));
			}
			oQtdHasApl.value = nQtdHas;
			//console.log(nPorcent+"-"+nQtdHas+"-"+nDosagem+"-"+oQtdPrev.value);
		}

		// obtem talhoes
		var oTalhao = document.getElementById("TALHAO");
		if (oTalhao){
			strTalhoes += oTalhao.value+",";
		}
		var oQtdTh = document.getElementById("MACROTAREFAXTALHAO__QTDLINES");
		if (oQtdTh){
			var max = parseInt(oQtdTh.value);
			for (var i=1; i<=max; i++){
				var oTalhaoIt = document.getElementById("MACROTAREFAXTALHAO__TALHAO__"+i);
				strTalhoes += oTalhaoIt.value+",";
			}
		}
		getValueByAjax4("CARENCIA","getTarefasReentrada","DIASCARENCIA;"+strProdutos+";"+strTalhoes,"runChange(\"CARENCIA\")");
		getValueByAjax4("REENTRADA","getTarefasReentrada","DIASREENTRADA;"+strProdutos+";"+strTalhoes,"runChange(\"REENTRADA\")");
	}
	calcAplicacaoFaixa();
	validaMacrotarefa();
}
function validaMacrotarefa(){

	//valida dados da macrotarefaxtalhao
	var oVazao = document.getElementById("VAZAO");
	var oCpTanque = document.getElementById("CAPACIDADETANQUE");
	var oQtdHas = document.getElementById("QTDHAS");
	var oQtdLinesProd = document.getElementById("MACROTAREFAXPRODUTO__QTDLINES");
	var oQtdLinesTalhao = document.getElementById("MACROTAREFAXTALHAO__QTDLINES");

	if (oVazao && oCpTanque && oQtdHas && oQtdLinesProd){
		var maxTal = parseInt(oQtdLinesTalhao.value);
		for (var i=1; i<=maxTal; i++){
			var visivel = document.getElementById("trMACROTAREFAXTALHAO__"+i);
			if(visivel.style.visibility != 'hidden'){
				oQTDHAS_MXT = document.getElementById("MACROTAREFAXTALHAO__QTDHAS__"+i);
				oPorcent_MXT = document.getElementById("MACROTAREFAXTALHAO__PORCENTAGEM__"+i);
				oQTDHASAPL_MXT = document.getElementById("MACROTAREFAXTALHAO__QTDHASAPL__"+i);
				oQTDHASAPL_MXT.value = parseNumberToDouble(oQTDHAS_MXT.value) * (parseNumberToDouble(oPorcent_MXT.value)/100);
			}

		}
	}
	
	//valida dados dos totais do talhão na macrotarefa
	var nTotQtdHas = 0;
	var nTotQtdHasApl = 0;
	var oQtdLines = document.getElementById("MACROTAREFAXTALHAO__QTDLINES");
	if (oQtdLines){
		for (var i=1; i<=parseInt(oQtdLines.value); i++){
			var oChk = document.getElementById("MACROTAREFAXTALHAO"+"__CHK__"+i);
			if (oChk.value != "true")
				continue;

			var nQtdHas = parseNumberToDouble(document.getElementById("MACROTAREFAXTALHAO"+"__QTDHAS__"+i).value);
			var nPorcent = parseNumberToDouble(document.getElementById("MACROTAREFAXTALHAO"+"__PORCENTAGEM__"+i).value);
			var nQtdApl = nQtdHas*(nPorcent/100);
			document.getElementById("MACROTAREFAXTALHAO"+"__QTDHASAPL__"+i).value = parseDoubleToNumber(nQtdApl);

			nTotQtdHas += nQtdHas;
			nTotQtdHasApl += nQtdApl;
		}
		document.getElementById("QTDHAS").value = parseDoubleToNumber(nTotQtdHas);
		document.getElementById("QTDHASAPL").value = parseDoubleToNumber(nTotQtdHasApl);
		document.getElementById("PORCENT").value = parseDoubleToNumber( (nTotQtdHasApl/nTotQtdHas) * 100);
	}

	//recalcula carencia e reentrada
	var max = parseInt(oQtdLinesProd.value);
	if (oVazao && oCpTanque && oQtdHas && oQtdLinesProd){
		var strProdutos = "";
		var strTalhoes = "";
		for (var i=1; i<=max; i++){
			var oProduto = document.getElementById("MACROTAREFAXPRODUTO__PRODUTO__"+i);
			strProdutos += oProduto.value+",";
			var oTalhao = document.getElementById("TALHAO");
			
			if (oTalhao){
				strTalhoes += oTalhao.value+",";
			}
			var oQtdTh = document.getElementById("MACROTAREFAXTALHAO__QTDLINES");
			if (oQtdTh){
				var max = parseInt(oQtdTh.value);
				for (var i=1; i<=max; i++){
					var oTalhaoIt = document.getElementById("MACROTAREFAXTALHAO__TALHAO__"+i);
					strTalhoes += oTalhaoIt.value+",";
				}
			}

		}
		getValueByAjax4("CARENCIA","getTarefasReentrada","DIASCARENCIA;"+strProdutos+";"+strTalhoes,"runChange(\"CARENCIA\")");
		getValueByAjax4("REENTRADA","getTarefasReentrada","DIASREENTRADA;"+strProdutos+";"+strTalhoes,"runChange(\"REENTRADA\")");
	}

    //Recalcula a Quantidade Prevista
    var oVazao = document.getElementById("VAZAO");
	var oCpTanque = document.getElementById("CAPACIDADETANQUE");
	var oQtdHas = document.getElementById("QTDHAS");
	var oQtdHasApl = document.getElementById("QTDHASAPL");
	var oQtdLinesProd = document.getElementById("MACROTAREFAXPRODUTO__QTDLINES");
	var oQtdLinesTalhao = document.getElementById("MACROTAREFAXTALHAO__QTDLINES");
	var oPorcent = document.getElementById("PORCENT"); // faixa

	if (oVazao && oCpTanque && oQtdHas && oQtdLinesProd){
		var strProdutos = "";
		var strTalhoes = "";
		var max = parseInt(oQtdLinesProd.value);
		var maxTal = parseInt(oQtdLinesTalhao.value);
		var nQtdHasTot = 0.00;
		for (var i=1; i<=maxTal; i++){
			var visivel = document.getElementById("trMACROTAREFAXTALHAO__"+i);
			if(visivel.style.visibility != 'hidden'){
				oQTDHAS_MXT = document.getElementById("MACROTAREFAXTALHAO__QTDHAS__"+i);
				oPorcent_MXT = document.getElementById("MACROTAREFAXTALHAO__PORCENTAGEM__"+i);
				nQtdHasTot += parseNumberToDouble(document.getElementById("MACROTAREFAXTALHAO__QTDHASAPL__"+i).value);
				if (document.getElementById("MACROTAREFAXTALHAO__QTDHASAPL__"+i).value == 0){
					nQtdHasTot += parseNumberToDouble(oQTDHAS_MXT.value) * parseNumberToDouble(oPorcent_MXT.value);
				}
			}

		}
		for (var i=1; i<=max; i++){
			var oProduto = document.getElementById("MACROTAREFAXPRODUTO__PRODUTO__"+i);
			var oDosagem = document.getElementById("MACROTAREFAXPRODUTO__DOSAGEM__"+i);
			var oQtdTanque = document.getElementById("MACROTAREFAXPRODUTO__QTDTANQUE__"+i);
			var oQtdPrev = document.getElementById("MACROTAREFAXPRODUTO__QTDPREV__"+i);


			strProdutos += oProduto.value+",";
			var nPorcent = parseNumberToDouble(oPorcent.value);
			var nVazao = parseNumberToDouble(oVazao.value);
			var nCpTanque = parseNumberToDouble(oCpTanque.value);
			var nDosagem = parseNumberToDouble(oDosagem.value);
			var nQtdTanque = parseNumberToDouble(oQtdTanque.value);
			var nQtdHas = parseNumberToDouble(oQtdHas.value);

			if(nQtdHasTot > 0){
				nQtdHas = nQtdHasTot;
			}

			if (nPorcent > 100){
				nPorcent = 100;
				oPorcent.value = parseDoubleToNumber(nPorcent);
			}

			if (nVazao > 0){
				//var nHect = (nCpTanque/nVazao)/(nPorcent/100);
				var nHect = (nCpTanque/nVazao);
				nQtdTanque = nDosagem * nHect;
				oQtdTanque.value = parseDoubleToNumber(nQtdTanque);
			}
			if(nQtdHasTot > 0){
				oQtdPrev.value = parseDoubleToNumber((nDosagem * nQtdHas));
			} else {
				oQtdPrev.value = parseDoubleToNumber((nDosagem * nQtdHas) * (nPorcent/100));
			}
			oQtdHasApl.value = nQtdHas;
			//console.log(nPorcent+"-"+nQtdHas+"-"+nDosagem+"-"+oQtdPrev.value);
		}

		// obtem talhoes
		var oTalhao = document.getElementById("TALHAO");
		if (oTalhao){
			strTalhoes += oTalhao.value+",";
		}
		var oQtdTh = document.getElementById("MACROTAREFAXTALHAO__QTDLINES");
		if (oQtdTh){
			var max = parseInt(oQtdTh.value);
			for (var i=1; i<=max; i++){
				var oTalhaoIt = document.getElementById("MACROTAREFAXTALHAO__TALHAO__"+i);
				strTalhoes += oTalhaoIt.value+",";
			}
		}
		getValueByAjax4("CARENCIA","getTarefasReentrada","DIASCARENCIA;"+strProdutos+";"+strTalhoes,"runChange(\"CARENCIA\")");
		getValueByAjax4("REENTRADA","getTarefasReentrada","DIASREENTRADA;"+strProdutos+";"+strTalhoes,"runChange(\"REENTRADA\")");
	}
	calcAplicacaoFaixa();
	
}
function runChange(inputName){
	document.getElementById(inputName).dispatchEvent(new Event('change'));
	document.getElementById(inputName).dispatchEvent(new Event('keyup'));
}
function calcPedidoItem(){
	var oQtdLines = document.getElementById("PEDIDOITEM__QTDLINES");
	var nTotQtd = 0;
	var nTotVlrTotal = 0;
	if (oQtdLines){
		var max = parseInt(oQtdLines.value);
		for (var i=1; i<=max; i++){
			var oChk = document.getElementById("PEDIDOITEM__CHK__"+i);
			if (oChk.value != "true")
				continue;

			var oQtd = document.getElementById("PEDIDOITEM__QUANTIDADE__"+i);
			var oPreco = document.getElementById("PEDIDOITEM__PRECO__"+i);
			var oVlrTotal = document.getElementById("PEDIDOITEM__VLRTOTAL__"+i);

			var nQtd = parseNumberToDouble(oQtd.value);
			nTotQtd += nQtd;
			var nPreco = parseNumberToDouble(oPreco.value);
			var nVlrTotal = parseNumberToDouble(oVlrTotal.value);
			if (nPreco > 0){
				nVlrTotal = nQtd * nPreco;
				oVlrTotal.value = parseDoubleToNumber(nVlrTotal);
			}
			nTotVlrTotal += nVlrTotal;
		}
		var oTotQtd = document.getElementById("TOTAL__PEDIDOITEM__QUANTIDADE");
		var oTotVlrTotal = document.getElementById("TOTAL__PEDIDOITEM__VLRTOTAL");
		if (oTotQtd && oTotVlrTotal){
			oTotQtd.value = nTotQtd;
			oTotVlrTotal.value = nTotVlrTotal;
		}

	}

}
function calcAmostraTipoTorra(){
	var tableName = "AMOSTRAXTIPOTORRA";
	var oQtdLines = document.getElementById(tableName+"__QTDLINES");
	var nTotQtd = 0;
	var nTotVlrTotal = 0;
	if (oQtdLines){
		var max = parseInt(oQtdLines.value);
		for (var i=1; i<=max; i++){
			var oChk = document.getElementById(tableName+"__CHK__"+i);
			if (oChk.value != "true")
				continue;
		}
		var oSituacao = document.getElementById(tableName+"__SITUACAO__"+max);
		var oSituacaoDesc = document.getElementById(tableName+"__SITUACAO__"+max+"_DESC");
		oSituacao.value = "A";
		oSituacaoDesc.value = "ABERTA";
		var oConcluido = document.getElementById(tableName+"__CONCLUIDO__"+max);
		oConcluido.value = "N";
		var oQtdComprada = document.getElementById(tableName+"__QTDCOMPRADA__"+max);
		oQtdComprada.value = "0";
		var oQtdReservada = document.getElementById(tableName+"__QTDRESERVADA__"+max);
		oQtdReservada.value = "0";
		var oQtdSaldo = document.getElementById(tableName+"__QTDSALDO__"+max);
		oQtdSaldo.value = "0";
		var oPrevia = document.getElementById(tableName+"__PREVIA__"+max);
		oPrevia.value = "0";
		var oAG = document.getElementById(tableName+"__AG__"+max);
		oAG.value = "0";
		var oLight = document.getElementById(tableName+"__LIGHT__"+max);
		oLight.value = "0";
		var oQUAKER = document.getElementById(tableName+"__QUAKER__"+max);
		oQUAKER.value = "0";
	}
}
function calcNotaFiscalItem(){
	var tableName = "NOTAFISCALITEM";
	var oQtdLines = document.getElementById(tableName+"__QTDLINES");
	var nTotQtd = 0;
	var nTotVlrTotal = 0;
	if (oQtdLines){
		var max = parseInt(oQtdLines.value);
		for (var i=1; i<=max; i++){
			var oChk = document.getElementById(tableName+"__CHK__"+i);
			if (oChk.value != "true")
				continue;

			var oQtd = document.getElementById(tableName+"__QUANTIDADE__"+i);
			var oPreco = document.getElementById(tableName+"__PRECO__"+i);
			var oVlrTotal = document.getElementById(tableName+"__VLRTOTAL__"+i);

			var nQtd = parseNumberToDouble(oQtd.value);
			nTotQtd += nQtd;
			var nPreco = parseNumberToDouble(oPreco.value);
			var nVlrTotal = parseNumberToDouble(oVlrTotal.value);
			if (nPreco > 0){
				nVlrTotal = nQtd * nPreco;
				oVlrTotal.value = parseDoubleToNumber(nVlrTotal);
			}
			nTotVlrTotal += nVlrTotal;
		}
		var oVlrFrete = document.getElementById("VLRFRETE");
		var oVlrDesconto = document.getElementById("VLRDESCONTO");
		var oVlrTotal = document.getElementById("VLRTOTAL");
		if (oVlrFrete && oVlrDesconto && oVlrTotal){
			var nVlrFrete = parseNumberToDouble(oVlrFrete.value);
			var nVlrDesconto = parseNumberToDouble(oVlrDesconto.value);
			nTotVlrTotal = nTotVlrTotal + nVlrFrete - nVlrDesconto;
			oVlrTotal.value = parseDoubleToNumber(nTotVlrTotal);
		}

		var oTotQtd = document.getElementById("TOTAL__"+tableName+"__QUANTIDADE");
		var oTotVlrTotal = document.getElementById("TOTAL__"+tableName+"__VLRTOTAL");
		if (oTotQtd && oTotVlrTotal){
			oTotQtd.value = nTotQtd;
			oTotVlrTotal.value = nTotVlrTotal;
		}
		var sTotVlrTotal = parseDoubleToNumber(nTotVlrTotal);
		document.getElementById("NOTAFISCALPAGTO__QTDPARC__1").value="1";
		document.getElementById("NOTAFISCALPAGTO__VLRTOTAL__1").value=sTotVlrTotal;
		document.getElementById("NOTAFISCALPAGTO__VLRPARCELA__1").value=sTotVlrTotal;
	} else {
		// edicao
		var oQtd = document.getElementById("QUANTIDADE");
		var oPreco = document.getElementById("PRECO");
		var oVlrTotal = document.getElementById("VLRTOTAL");

		if (oQtd && oPreco && oVlrTotal){
			var nQtd = parseNumberToDouble(oQtd.value);
			nTotQtd += nQtd;
			var nPreco = parseNumberToDouble(oPreco.value);
			var nVlrTotal = parseNumberToDouble(oVlrTotal.value);
			if (nPreco > 0){
				nVlrTotal = nQtd * nPreco;
				oVlrTotal.value = parseDoubleToNumber(nVlrTotal);
			}
		}
	}

}
function calcTotal(tableName,fieldName){
	var oQtdLines = document.getElementById(tableName+"__QTDLINES");
	var nTotQtd = 0;
	if (oQtdLines){
		var max = parseInt(oQtdLines.value);
		for (var i=1; i<=max; i++){
			var oChk = document.getElementById(tableName+"__CHK__"+i);
			if (oChk.value == "true"){
				var oQtd = document.getElementById(tableName+"__"+fieldName+"__"+i);
				if (oQtd){
					var nQtd = parseNumberToDouble(oQtd.value);
					nTotQtd += nQtd;
				}
			}
		}
		var oTotQtd = document.getElementById("TOTAL__"+tableName+"__"+fieldName);
		if (oTotQtd){
			oTotQtd.value = parseDoubleToNumber(nTotQtd);
		}
	}
}
function mostraConsultaPadrao2(tableName,tableNameRelation,fieldName,idCodigoDestino,idReference,filter){
	var oObj = document.getElementById('divDialog');
	if (oObj){
		document.getElementById('divDialogBody').innerHTML = '';
		var valueRef = "";
		if (idReference.indexOf(",") >= 0){
			var aRef = idReference.split(",");
			for (var i=0; i<aRef.length; i++){
				var oRef = document.getElementById(aRef[i]);
				if (oRef){
					if (oRef.value != "")
						valueRef += oRef.value+";";
				}
			}
		} else {
			var oRef = document.getElementById(idReference);
			if (oRef)
				valueRef = oRef.value;
		}
		oObj.style.display = 'block';
		oObj.style.visibility = 'visible';
		oObj.style.top = 100;
		oObj.style.left = 20;
		openAjax('index.jsp?'+getFormParams('ConsultaPadraoDialog')+'&tablename='+tableName+'&tablenamerelation='+tableNameRelation+'&fieldname='+fieldName+'&idCodigoDestino='+idCodigoDestino+'&codigoReference='+valueRef+'&filter='+filter,'','divDialogBody');
	}
}
function onchangeNFProduto(oThis){
	var aId = oThis.id.split("__");
	if (aId.length == 3){
		var iNro = aId[2];
		var oProduto = document.getElementById("NOTAFISCALITEM__PRODUTO__"+iNro);
		getValueByAjax3("NOTAFISCALITEM__UNIDADEMEDIDA__"+iNro,"PRODUTO","UNIDADEMEDIDA",oProduto.value,"afterOnchangeNFProduto("+iNro+")");
		getValueByAjax3("NOTAFISCALITEM__ARMAZEM__"+iNro,"PRODUTO","ARMAZEM",oProduto.value,"afterOnchangeNFProduto("+iNro+")");
	}
}
function afterOnchangeNFProduto(iNro){
	document.getElementById("NOTAFISCALITEM__UNIDADEMEDIDA__"+iNro).onkeyup();
	document.getElementById("NOTAFISCALITEM__ARMAZEM__"+iNro).onkeyup();
}
function getNextPicote(oThis){
	if (oThis){
		var nomeLote = oThis.value;
		getValueByAjax4("PICOTE","getNextPicoteOfMacroAmostra",nomeLote,"");
		onCarregaMacroAmostra(nomeLote);
	}
}
function getValueByAjax4(idDestino,functionname,params,afterFunction){
	var url = 'index.jsp?'+"&empresa="+document.getElementById("empresa").value;
	var param = '&msgtype=getValueByAjax4';
	param += '&functionname='+functionname;
	param += '&params='+params;
	var xmlhttp;
	d = new Date();
	if (window.XMLHttpRequest) 	{
		xmlhttp=new XMLHttpRequest();
	} else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.timeout = 3000;
	xmlhttp.ontimeout = function () { if (trying < 3) { getValueByAjax4(idDestino,functionname,params,afterFunction,trying);} }
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4){
			if (xmlhttp.status==200){
				var oInputDestino = document.getElementById(idDestino);
					if (oInputDestino){
						console.log("ajax4:"+param+" r:"+xmlhttp.responseText);
						oInputDestino.value=xmlhttp.responseText;
						eval(afterFunction);
					}
				}
			}
		};
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=UTF-8');
	xmlhttp.send(param);
}
// ------------------- Class MyMapa --------------------------
var MyMapa = function (){
	this.canvas = undefined;
	this.zoom = 1;
	this.width = 0;
	this.height = 0;
	this.marginLeftMove = 0;
	this.marginTopMove = 0;
	this.aArea = new Array();
	this.aPoints = new Array();
	this.maxLat = 0;
	this.maxLon = 0;
	this.minLon = 9999999;
	this.minLat = 9999999;
	this.padding = 20;
	this.raio = 10;
	this.isShowMessage = true;
	this.photo_point = {x:-1000,y:-1000};
}
MyMapa.prototype.initMap = function(idName){
	this.canvas = document.getElementById(idName);
	if (this.canvas){
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		var scope = this;
		this.canvas.addEventListener('click',function(evt){
			var mousePos = scope.getMousePos(evt);
			scope.showMessage(mousePos);
		});
		this.drawMap();
	} else {
		console.log("Element "+idName+" not found!");
	}
}
MyMapa.prototype.setArea = function(aAreaParam){
	this.aArea = aAreaParam;
}
MyMapa.prototype.setPoints = function(aPointsParam){
	this.aPoints = aPointsParam;
}
MyMapa.prototype.setShowMessage = function(mode){
	this.isShowMessage = mode;
}
MyMapa.prototype.parseLongitudeToPixels = function(longitude){
	var iTmp = this.parseGeoToInt(longitude);
	var x = this.maxLon-this.minLon;
	var r = (iTmp - this.minLon);

	var zoom1 = (this.canvas.height/(this.maxLat-this.minLat))*0.9;
	var zoom2 = (this.canvas.width/(this.maxLon-this.minLon))*0.9;
	if (zoom1 < zoom2)
		this.zoom = zoom1;
	else
		this.zoom = zoom2;

	r = r * this.zoom;
	var c = ((this.canvas.width-(x*this.zoom))/2);
	r += this.marginLeftMove+c;
	return parseInt(r);
}
MyMapa.prototype.parseLatitudeToPixels = function(latitude){
	var iTmp = this.parseGeoToInt(latitude);
	var x = this.maxLat-this.minLat;
	var r = x-(iTmp - this.minLat);

	var zoom1 = (this.canvas.height/(this.maxLat-this.minLat))*0.9;
	var zoom2 = (this.canvas.width/(this.maxLon-this.minLon))*0.9;
	if (zoom1 < zoom2)
		this.zoom = zoom1;
	else
		this.zoom = zoom2;

	r = r * this.zoom;
	var c = ((this.canvas.height-(x*this.zoom))/2);
	r += this.marginTopMove+c;
	return parseInt(r);
}
MyMapa.prototype.parseGeoToInt = function(str){
	var x = (str * 100000);
	return parseInt(x);
}
MyMapa.prototype.readArea = function(){

	for (i in this.aArea){
		var aLoc = this.aArea[i].split(",");
		var iLatTmp = this.parseGeoToInt(aLoc[0]);
		var iLonTmp = this.parseGeoToInt(aLoc[1]);
		if (this.minLat == 0)
			this.minLat = iLatTmp;
		if (this.minLon == 0)
			this.minLon = iLonTmp;

		if (this.maxLat == 0)
			this.maxLat = iLatTmp;
		if (this.maxLon == 0)
			this.maxLon = iLonTmp;

		if (iLatTmp > this.maxLat)
			this.maxLat = iLatTmp;
		if (iLonTmp > this.maxLon)
			this.maxLon = iLonTmp;
		if (iLatTmp < this.minLat)
			this.minLat = iLatTmp;
		if (iLonTmp < this.minLon)
			this.minLon = iLonTmp;
	}
}
MyMapa.prototype.drawMap = function(){
	this.readArea();

	// desenha area
	var ctx = this.canvas.getContext('2d');
	ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	ctx.strokeStyle = '#33cc00';
	ctx.fillStyle = '#33cc00';
	ctx.beginPath();
	for (var i in this.aArea){
		var aLoc = this.aArea[i].split(",");
		var lat = this.parseLatitudeToPixels(aLoc[0]);
		var lng = this.parseLongitudeToPixels(aLoc[1]);
		if (i==0)
			ctx.moveTo(lng,lat);
		else
			ctx.lineTo(lng,lat);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	// desenha pontos monitorados
	for (var i in aPoints){
		var title = aPoints[i].title;
		var color = aPoints[i].color;
		var src = aPoints[i].src;
		var visible = aPoints[i].visible;
		var aLoc = aPoints[i].location.split(",");
		if (visible == undefined || visible){
			var lat = this.parseLatitudeToPixels(aLoc[0]);
			var lng = this.parseLongitudeToPixels(aLoc[1]);
			ctx.fillStyle = 'white';
			ctx.beginPath();
			ctx.arc(lng,lat,this.raio+2,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(lng,lat,this.raio,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
			if (src != undefined && src != ""){
				this.drawIconPhoto(ctx,lng,lat);
			}

		}
	}

}
MyMapa.prototype.drawIconPhoto = function(ctx,posX,posY){
	ctx.fillStyle = 'black';
	ctx.fillRect(posX-2,posY-7,5,2);
	ctx.fillRect(posX-7,posY-5,14,10);
	ctx.fillStyle = 'black';
	ctx.strokeStyle = 'white';
	ctx.beginPath();
	ctx.arc(posX,posY,3,0,2*Math.PI);
	ctx.stroke();
	ctx.closePath();
}
MyMapa.prototype.getMousePos = function(evt){
	var rect = this.canvas.getBoundingClientRect();
	return {x: evt.clientX - rect.left, y: evt.clientY - rect.top};
}
MyMapa.prototype.filter = function(text){
	this.clearFilter();
	for (var i in aPoints){
		var title = aPoints[i].title;
		if (title != text){
			aPoints[i].visible = false;
		}
	}
	this.drawMap();
}
MyMapa.prototype.clearFilter = function(){
	for (var i in aPoints){
		var title = aPoints[i].title;
		aPoints[i].visible = true;
	}
	this.drawMap();
}
MyMapa.prototype.showMessage = function(mousePos){

	if (!this.isShowMessage)
		return;

	var dialogHeight = 55;
	var dialogWidth = 150;
	var found = false;

	this.drawMap();
	for (var i in aPoints){
		var title = aPoints[i].title;
		var subtitle = aPoints[i].subtitle;
		var src = aPoints[i].src;
		var visible = aPoints[i].visible;
		var aLoc = aPoints[i].location.split(",");
		var lat = this.parseLatitudeToPixels(aLoc[0]);
		var lng = this.parseLongitudeToPixels(aLoc[1]);

		if (!visible)
			continue;

		// check click in photo icon
		if (mousePos.x >= this.photo_point.x-this.raio && mousePos.x <= this.photo_point.x+this.raio){
			if (mousePos.y >= this.photo_point.y-this.raio && mousePos.y <= this.photo_point.y+this.raio){
				found = true;
				window.open("uploads/"+this.photo_point.src);
			}
		}

		if (mousePos.x >= lng-this.raio && mousePos.x <= lng+this.raio){
			if (mousePos.y >= lat-this.raio && mousePos.y <= lat+this.raio){
				found = true;

				if (this.width-mousePos.y-100 < 0){
					mousePos.y -= dialogHeight;
				}
				var ctx = this.canvas.getContext('2d');
				ctx.fillStyle = 'white';
				ctx.fillRect(mousePos.x-1,mousePos.y-1,dialogWidth+2,dialogHeight+2);
				ctx.fillStyle = 'gray';
				ctx.fillRect(mousePos.x,mousePos.y,dialogWidth,dialogHeight);
				ctx.font = '9pt Tahoma';
				ctx.fillStyle = 'white';
				ctx.fillText(title,mousePos.x+10,mousePos.y+15);
				if (subtitle != undefined)
					ctx.fillText(subtitle,mousePos.x+10,mousePos.y+30);

				// draw icon photo
				if (src != undefined && src != ""){
					ctx.fillStyle = 'black';
					ctx.fillRect(mousePos.x+10,mousePos.y+34,5,2);
					ctx.fillRect(mousePos.x+10,mousePos.y+37,15,10);
					ctx.fillStyle = 'gray';
					ctx.beginPath();
					ctx.arc(mousePos.x+17,mousePos.y+42,3,0,2*Math.PI);
					ctx.fill();
					ctx.closePath();
					this.photo_point = {x:mousePos.x+17,y:mousePos.y+42,src:src};
				}

				/*var base_image = new Image();
				base_image.src = 'img/icone_bt_home.png';
				base_image.onload = function(){
					ctx.drawImage(base_image, mousePos.x, mousePos.y);
				}*/
			}
		}
		if (!found){
			this.photo_point = {x:-1000,y:-1000};
		}
	}


}
function mark(preId,position,total){
	for (i=0; i<100; i++){
		var oMark = document.getElementById(preId+i);
		if (oMark){
			oMark.style.background = "";
			if (i == position)
				oMark.style.background = "#A9BCF5";
		}
	}


}
function setValueByAjax(tableName,fieldName,value,registry,afterFunction){
	var url = 'index.jsp?';
	var param = "&msgtype=setValueByAjax"+getFormParams2('formMenuItem');
	param += '&tableName='+tableName;
	param += '&fieldName='+fieldName;
	param += '&value='+value;
	param += '&registry='+registry;
	//console.log(param);
	var xmlhttp;
	d = new Date();
	if (window.XMLHttpRequest) 	{
		xmlhttp=new XMLHttpRequest();
	} else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4){
			if (xmlhttp.status==200){
				eval(afterFunction);
			}
		}
	};
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=UTF-8');
	xmlhttp.send(param);
}
function setInputInvisible(oObj){
	if (oObj){
		oObj.style.visibility = "hidden";
	}
}
function calcClassificacao(){
	var fields = ["ESPP18","ESPP17","ESPP16","ESPP15","ESPP14","ESPMK11","ESPMK10","ESPMKCHT"];
	var fields2 = ["ESPPELRES","ESPENCESC","ESPCATA"];
	var fields3 = ["COMP18","COMP17","COMP16","COMP15","COMP14","COMMK11","COMMK10","COMMKCHT"];
	var fields4 = ["COMPELRES","COMENCESC","COMCATA","COMFUNDO"];

	var nTotalEspAprov = 0;
	var nTotalComAprov = 0;
	for (i = 0; i < fields.length; i++) {
		var oField = document.getElementById(fields[i]);
		if (oField)
			nTotalEspAprov += parseNumberToDouble(oField.value);
	}
	var oTotAprovEsp = document.getElementById("ESPAPROV");
	oTotAprovEsp.value = parseDoubleToNumber(nTotalEspAprov);
	for (i = 0; i < fields3.length; i++) {
		var oField = document.getElementById(fields3[i]);
		if (oField)
			nTotalComAprov += parseNumberToDouble(oField.value);
	}
	var oTotAprovCom = document.getElementById("COMAPROV");
	oTotAprovCom.value = parseDoubleToNumber(nTotalComAprov);

	var nTotCataEsp = 0;
	for (i = 0; i < fields2.length; i++) {
		var oField = document.getElementById(fields2[i]);
		nTotCataEsp += parseNumberToDouble(oField.value);
	}
	var oTotCataEsp = document.getElementById("ESPTOTCATA");
	oTotCataEsp.value = parseDoubleToNumber(nTotCataEsp);

	var nTotCataCom = 0;
	for (i = 0; i < fields4.length; i++) {
		var oField = document.getElementById(fields4[i]);
		nTotCataCom += parseNumberToDouble(oField.value);
	}
	var oTotCataCom = document.getElementById("COMTOTCATA");
	oTotCataCom.value = parseDoubleToNumber(nTotCataCom);

	var oTotClass = document.getElementById("TOTCLASSIF");
	oTotClass.value = parseDoubleToNumber(nTotalEspAprov+nTotalComAprov+nTotCataEsp+nTotCataCom);

	// calcula porcentagens
	for (i = 0; i < fields.length; i++) {
		var oField = document.getElementById(fields[i]);
		var oField2 = document.getElementById(fields[i]+"__PORCENT");
		var nValor = parseNumberToDouble(oField.value);
		oField2.value = parseDoubleToNumber((nValor/(nTotalEspAprov+nTotCataEsp))*100);
	}
	for (i = 0; i < fields2.length; i++) {
		var oField = document.getElementById(fields2[i]);
		var oField2 = document.getElementById(fields2[i]+"__PORCENT");
		var nValor = parseNumberToDouble(oField.value);
		oField2.value = parseDoubleToNumber((nValor/(nTotalEspAprov+nTotCataEsp))*100);
	}
}
function calcTotalItem(tableName,fieldName){

	var oQtdLines = document.getElementById("QTDCHECKBOX");
	var nTotal = 0;
	if (oQtdLines){
		var max = parseInt(oQtdLines.value);
		for (var i=0; i<max; i++){
			var oChk = document.getElementById("CHECKBOX__"+i);
			if (oChk){
				if (oChk.checked != true)
					continue;
				var oValor = document.getElementById(fieldName+"__"+i);
				if (oValor)
					nTotal += parseStringToFloat(oValor.value);
			}
		}
	}
	var oTotal = document.getElementById("TOTAL");
	if (oTotal)
		oTotal.value = parseDoubleToNumber(nTotal);
}
function calcAplicacaoFaixa(){
	var oHectar = document.getElementById("QTDHAS");
	var oPorcent = document.getElementById("PORCENT");
	var oAplicar = document.getElementById("QTDHASAPL");
	if (oHectar && oPorcent && oAplicar){
		var nHectar = parseNumberToDouble(oHectar.value);
		var nPorcent = parseNumberToDouble(oPorcent.value);
		var nAplicar = nHectar * (nPorcent/100);
		oAplicar.value = parseDoubleToNumber(nAplicar);
	}

}
function setNroAmostra(){
	var d = new Date();
	var iDia = d.getDate();
	var iMes = d.getMonth()+1;
	var dia = (iDia < 10) ? "0"+iDia : iDia ;
	var mes = (iMes < 10) ? "0"+iMes : iMes ;
	var ano = d.getFullYear()+"";
	var oNome = document.getElementById("NOME");
	oNome.value = ano.substring(2, 4)+""+mes+""+dia+"-";
}
function onChangeGrupoConsultaPadrao(tableName,fieldName,idCodigoDestino,oThis){
	openAjax("index.jsp?"+getFormParams("ConsultaPadraoDialog")+"&tablename="+tableName+"&fieldname="+fieldName+"&codigoGrupo="+oThis.value+"&idCodigoDestino="+idCodigoDestino,"","divDialogBody");
}
function getData(){
	var d = new Date();
	var iDia = d.getDate();
	var iMes = d.getMonth()+1;
	var dia = (iDia < 10) ? "0"+iDia : iDia ;
	var mes = (iMes < 10) ? "0"+iMes : iMes ;
	var ano = d.getFullYear()+"";
	return dia+"/"+mes+"/"+ano;
}
function getHora(){
    var d = new Date();
	var horas = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours() ;
	var minutos = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes() ;
    return d.getHours()+":"+minutos;
}
function calcConciliado(){
	var oQtdLines = document.getElementById('MOVBANCARIO__QTDLINES');
	if (oQtdLines){
		var nTotal = 0;
		for (var i=0; i<oQtdLines.value;i++){
			var oDtConc = document.getElementById('MOVBANCARIO__DTCONCILIADO__'+i);
			if (oDtConc.value.trim().length == 10){
				var nVlr = parseNumberToDouble(document.getElementById('MOVBANCARIO__VLRMOVI__'+i).value);
				nTotal += nVlr;
			}
		}
		var oTotConc = document.getElementById('TOTALCONCILIADO');
		if (oTotConc)
			oTotConc.value = parseDoubleToNumber(nTotal);
		var oSldInicial = document.getElementById('VLRSALDOINICIAL');
		var oSldExtrato = document.getElementById('SLDEXTRATO');
		var oDifSaldo = document.getElementById('DIFSALDO');
		var oTotSldConc = document.getElementById('TOTALSLDCONC');
		var oTotNaoConc = document.getElementById('TOTALNAOCONC');
		var oTotSldFinal = document.getElementById('TOTSALDOFINAL');
		if (oTotSldConc && oSldInicial && oTotNaoConc && oTotSldFinal){
			var nSldInicial = parseNumberToDouble(oSldInicial.value);
			var nTotSldFinal = parseNumberToDouble(oTotSldFinal.value);
			oTotSldConc.value =  parseDoubleToNumber(nSldInicial+nTotal);
			oTotNaoConc.value =  parseDoubleToNumber(nTotSldFinal-nSldInicial-nTotal);
		}
		if (oSldExtrato && oDifSaldo && oTotSldConc){
			var nDif = parseNumberToDouble(oTotSldConc.value)-parseNumberToDouble(oSldExtrato.value);
			oDifSaldo.value =  parseDoubleToNumber(nDif);
		}
	}
}
function onChangeGSA(oThis){
	var codAmostras = "";
	var tableName = "GUIAAMOSTRADESPEJO";
	var codigoGuia = document.getElementById("CODIGO").value;
	var nroGuia = document.getElementById("NOME").value;

	var mode = 0;
	if (oThis){
		var aId = oThis.id.split("__");
		if (aId.length == 3 && aId[0] == "GUIAAMOSTRADESPEJO"){
			mode = 1;
		}
	}


	var oQtdLines = document.getElementById(tableName+"__QTDLINES");
	var nTotPesoDespejo = 0;
	if (oQtdLines){
		var nTotQtd = 0;
		var nTotPesoAtual = 0;
		for (var i=1; i<=parseInt(oQtdLines.value); i++){
			var oChk = document.getElementById(tableName+"__CHK__"+i);
			if (oChk.value != "true")
				continue;
			codAmostras += document.getElementById(tableName+"__MACROAMOSTRA__"+i).value + ";";
			var lote = document.getElementById(tableName+"__MACROAMOSTRA__"+i).value;
			var nomeLote = document.getElementById(tableName+"__MACROAMOSTRA__"+i+"_DESC").value;
			nTotQtd += parseNumberToDouble(document.getElementById(tableName+"__QUANTIDADE__"+i).value);
			nTotPesoAtual += parseNumberToDouble(document.getElementById(tableName+"__PESOATUAL__"+i).value);
			nTotPesoDespejo += parseNumberToDouble(document.getElementById(tableName+"__PESODESPEJO__"+i).value);

			// se o gatilho veio do despejo roda demais gatilhos
			if (mode == 1){
				var iNro = aId[2];
				if (iNro == i){
					getValueByAjax3("GUIAAMOSTRADESPEJO__PARCEIRO__"+iNro,"MACROAMOSTRA","PARCEIRO",lote,"refreshInput('GUIAAMOSTRADESPEJO','PARCEIRO__"+iNro+"')");
					getValueByAjax3("GUIAAMOSTRADESPEJO__PENEIRA__"+iNro,"MACROAMOSTRA","PENEIRA",lote,"refreshInput('GUIAAMOSTRADESPEJO','PENEIRA__"+iNro+"')");
					getValueByAjax3("GUIAAMOSTRADESPEJO__PESOATUAL__"+iNro,"MACROAMOSTRA","SLDPESO",lote,"calcGSA('"+iNro+"')");
					getValueByAjax3("GUIAAMOSTRADESPEJO__QUANTIDADE__"+iNro,"MACROAMOSTRA","QUANTIDADE",lote,"calcGSA('"+iNro+"')");
					getValueByAjax4("GUIAAMOSTRADESPEJO__QTDRESERVADAPROVA__"+iNro,"getQtdReservaInGSA",lote+";"+codigoGuia,"calcGSA('"+iNro+"')");
				}
			}

			// calcula qtd reserv. na guia por lote de despejo
			var tableName2 = "GUIAAMOSTRARESERVA";
			var oQtdLines2 = document.getElementById(tableName2+"__QTDLINES");
			if (oQtdLines2){
				var nQtdTot = 0;
				for (var r=1; r<=parseInt(oQtdLines2.value); r++){
					var oChk = document.getElementById(tableName2+"__CHK__"+r);
					if (oChk.value != "true")
						continue;
					var nomeLoteTmp = document.getElementById(tableName2+"__LOTEDESPEJO__"+r).value;
					if (nomeLoteTmp == nomeLote){
						var sQtd = document.getElementById(tableName2+"__QUANTIDADE__"+r).value;
						var nQtd = parseNumberToDouble(sQtd);
						nQtdTot += nQtd;
					}
					var nomeLoteResult = document.getElementById(tableName2+"__LOTERESULT__"+r).value;
					if (nomeLoteResult == ""){
						document.getElementById(tableName2+"__LOTERESULT__"+r).value = nroGuia;
					}

				}
			}
			document.getElementById("GUIAAMOSTRADESPEJO__QTDRESERVADARESULT__"+i).value = parseDoubleToNumber(nQtdTot);
			calcGSA(i);
		}
		document.getElementById("TOTAL__GUIAAMOSTRADESPEJO__QUANTIDADE").value = parseDoubleToNumber(nTotQtd);
		document.getElementById("TOTAL__GUIAAMOSTRADESPEJO__PESOATUAL").value = parseDoubleToNumber(nTotPesoAtual);
		document.getElementById("TOTAL__GUIAAMOSTRADESPEJO__PESODESPEJO").value = parseDoubleToNumber(nTotPesoDespejo);
	}
	if (mode == 1){
		openAjax("index.jsp?"+getFormParams("GSATorrarComo")+"&amostras="+codAmostras,"","divPainelAuxiliar");
	}

	// ler RESERVAS pra calcular RESULTADO
	tableName = "GUIAAMOSTRARESULTADO";
	oQtdLines = document.getElementById(tableName+"__QTDLINES");
	if (oQtdLines){
		var nTotQtdPrev = 0;
		var nTotQtdPrevSld = 0;
		var nTotPesoPrev = 0;
		var nTotPeso = 0;
		var nTotPesoSaida = 0;
		for (var i=1; i<=parseInt(oQtdLines.value); i++){
			var oChk = document.getElementById(tableName+"__CHK__"+i);
			if (oChk.value != "true")
				continue;
			var codAmostraResult = document.getElementById(tableName+"__NOME__"+i).value;
			if (codAmostraResult == ""){
				document.getElementById(tableName+"__NOME__"+i).value = nroGuia;
				codAmostraResult = nroGuia;
			}
			if (document.getElementById(tableName+"__AG__"+i).value == ""){
				document.getElementById(tableName+"__AG__"+i).value = "60";
			}

			//nTotPesoSaida += parseNumberToDouble(document.getElementById(tableName+"__PESOSAIDA__"+i).value);

			// Localiza reservas
			var nQtd = 0;
			var tableName2 = "GUIAAMOSTRARESERVA";
			var oQtdLines2 = document.getElementById(tableName2+"__QTDLINES");
			if (oQtdLines2){
				for (var j=1; j<=parseInt(oQtdLines2.value); j++){
					var oChk2 = document.getElementById(tableName2+"__CHK__"+j);
					if (oChk2.value != "true")
						continue;
					var codAmostraResult2 = document.getElementById(tableName2+"__LOTERESULT__"+j).value;
					if (codAmostraResult == codAmostraResult2){
						nQtd += parseStringToFloat(document.getElementById(tableName2+"__QUANTIDADE__"+j).value);
					}
				}
			}
			var nPesoReal = parseStringToFloat(document.getElementById(tableName+"__PESO__"+i).value);
			var nPorPrev = parseStringToFloat(document.getElementById(tableName+"__PORPESO__"+i).value);
			var nQtdPrev = 0;
			var nPesoPrev = 0;
			if (nTotPesoDespejo > 0 && nPorPrev > 0){
				nQtdPrev = (nTotPesoDespejo/60)*(nPorPrev/100);
				nPesoPrev = (nTotPesoDespejo)*(nPorPrev/100);
			}
			var nAproveit = 0;
			if (nPesoReal > 0 && nPesoPrev > 0){
				nAproveit = (nPesoReal / nPesoPrev)*100;
			}
			document.getElementById(tableName+"__PESOPREV__"+i).value = parseDoubleToNumber(nPesoPrev);
			document.getElementById(tableName+"__QTDPREV__"+i).value = parseDoubleToNumber(nQtdPrev);
			document.getElementById(tableName+"__QTDPREVSLD__"+i).value = parseDoubleToNumber(nQtdPrev-nQtd);
			document.getElementById(tableName+"__APROVEITAMENTO__"+i).value = parseDoubleToNumber(nAproveit);

			nTotQtdPrev += parseNumberToDouble(document.getElementById(tableName+"__QTDPREV__"+i).value);
			nTotQtdPrevSld += parseNumberToDouble(document.getElementById(tableName+"__QTDPREVSLD__"+i).value);
			nTotPesoPrev += parseNumberToDouble(document.getElementById(tableName+"__PESOPREV__"+i).value);
			nTotPeso += parseNumberToDouble(document.getElementById(tableName+"__PESO__"+i).value);

		}
		document.getElementById("TOTAL__GUIAAMOSTRARESULTADO__QTDPREV").value = parseDoubleToNumber(nTotQtdPrev);
		nTotQtdPrevSld = (nTotPesoDespejo/60)-nTotQtdPrev;
		document.getElementById("TOTAL__GUIAAMOSTRARESULTADO__QTDPREVSLD").value = parseDoubleToNumber(nTotQtdPrevSld);
		document.getElementById("TOTAL__GUIAAMOSTRARESULTADO__PESOPREV").value = parseDoubleToNumber(nTotPesoPrev);
		document.getElementById("TOTAL__GUIAAMOSTRARESULTADO__PESO").value = parseDoubleToNumber(nTotPeso);
		document.getElementById("TOTAL__GUIAAMOSTRARESULTADO__QUEBRA").value = parseDoubleToNumber(nTotPeso-nTotPesoDespejo);
		//document.getElementById("TOTAL__GUIAAMOSTRARESULTADO__PESOSAIDA").value = parseDoubleToNumber(nTotPesoSaida);
	}

	// ler RESERVAS
	tableName = "GUIAAMOSTRARESERVA";
	oQtdLines = document.getElementById(tableName+"__QTDLINES");
	if (oQtdLines){
		var nQtd = 0;
		var nPesoSaida = 0;
		for (var i=1; i<=parseInt(oQtdLines.value); i++){
			var oChk = document.getElementById(tableName+"__CHK__"+i);
			if (oChk.value != "true")
				continue;
			nQtd += parseNumberToDouble(document.getElementById(tableName+"__QUANTIDADE__"+i).value);
			//nPesoSaida += parseNumberToDouble(document.getElementById(tableName+"__PESOSAIDA__"+i).value);
			var codMARsv = document.getElementById(tableName+"__MACROAMOSTRAXRESERVA__"+i).value;
			var iNro = i;
			getValueByAjax3(tableName+"__PARCEIRO__"+iNro,"MACROAMOSTRAXRESERVA","PARCEIRO",codMARsv,"refreshInput('GUIAAMOSTRARESERVA','PARCEIRO__"+iNro+"')");
			getValueByAjax3(tableName+"__PI__"+iNro,"MACROAMOSTRAXRESERVA","PI",codMARsv,"refreshInput('GUIAAMOSTRARESERVA','PI__"+iNro+"')");
			getValueByAjax3(tableName+"__AENPR__"+iNro,"MACROAMOSTRAXRESERVA","AENPR",codMARsv,"refreshInput('GUIAAMOSTRARESERVA','AENPR__"+iNro+"')");
			getValueByAjax3(tableName+"__PENEIRA__"+iNro,"MACROAMOSTRAXRESERVA","PENEIRA",codMARsv,"refreshInput('GUIAAMOSTRARESERVA','PENEIRA__"+iNro+"')");
			getValueByAjax3(tableName+"__OBS__"+iNro,"MACROAMOSTRAXRESERVA","OBS",codMARsv,"refreshInput('GUIAAMOSTRARESERVA','OBS__"+iNro+"')");
		}
		document.getElementById("TOTAL__GUIAAMOSTRARESERVA__QUANTIDADE").value = parseDoubleToNumber(nQtd);
		//document.getElementById("TOTAL__GUIAAMOSTRARESERVA__PESOSAIDA").value = parseDoubleToNumber(nPesoSaida);
	}

}
function onCarregaMacroAmostra(nomeLote){
	//var aMacroAmostra = selectRegistryByNome("MACROAMOSTRA",nomeLote);
	var person = { firstName: "001", lastName: "Doe"};
	var aCampos = ["ORIGEMAMOSTRA"]
	for (var i=0;i<aCampos.length;i++){
		var oCampo = document.getElementById(aCampos[i]);
		oCampo.value = person.firstName;
		oCampo.onchange();
	}
}
function calcGuiaEstoqueItem(){
	var tableName = "GUIAESTOQUERESULTADO";
	var oQtdLines = document.getElementById(tableName+"__QTDLINES");
	var nTotQtd = 0;
	var nTotVlrTotal = 0;
	if (oQtdLines){
		var max = parseInt(oQtdLines.value);
		for (var i=1; i<=max; i++){
			var oChk = document.getElementById(tableName+"__CHK__"+i);
			if (oChk.value != "true")
				continue;

			var oQtd = document.getElementById(tableName+"__QUANTIDADE__"+i);
			var oPreco = document.getElementById(tableName+"__PRECO__"+i);
			var oVlrTotal = document.getElementById(tableName+"__VLRTOTAL__"+i);

			var nQtd = parseNumberToDouble(oQtd.value);
			nTotQtd += nQtd;
			var nPreco = parseNumberToDouble(oPreco.value);
			var nVlrTotal = parseNumberToDouble(oVlrTotal.value);
			if (nPreco > 0){
				nVlrTotal = nQtd * nPreco;
				oVlrTotal.value = parseDoubleToNumber(nVlrTotal);
			}
			nTotVlrTotal += nVlrTotal;
		}
		var oTotVlrTotal = document.getElementById("TOTAL__"+tableName+"__VLRTOTAL");
		oTotVlrTotal.value = parseDoubleToNumber(nTotVlrTotal);
		var oTotQtd = document.getElementById("TOTAL__"+tableName+"__QUANTIDADE");
		oTotQtd.value = parseDoubleToNumber(nTotQtd);

	} else {
		// edicao
		var oQtd = document.getElementById("QUANTIDADE");
		var oPreco = document.getElementById("PRECO");
		var oVlrTotal = document.getElementById("VLRTOTAL");

		if (oQtd && oPreco && oVlrTotal){
			var nQtd = parseNumberToDouble(oQtd.value);
			nTotQtd += nQtd;
			var nPreco = parseNumberToDouble(oPreco.value);
			var nVlrTotal = parseNumberToDouble(oVlrTotal.value);
			if (nPreco > 0){
				nVlrTotal = nQtd * nPreco;
				oVlrTotal.value = parseDoubleToNumber(nVlrTotal);
			}
		}
	}

}
function onchangeGSProduto(oThis){
	var tablename = "GUIAESTOQUERESULTADO";
	var aId = oThis.id.split("__");
	if (aId.length == 3){
		var iNro = aId[2];
		var oProduto = document.getElementById(tablename+"__PRODUTO__"+iNro);
		getValueByAjax3(tablename+"__UNIDADEMEDIDA__"+iNro,"PRODUTO","UNIDADEMEDIDA",oProduto.value,"afterOnChangeGSProduto("+iNro+")");
		getValueByAjax3(tablename+"__ARMAZEM__"+iNro,"PRODUTO","ARMAZEM",oProduto.value,"afterOnChangeGSProduto("+iNro+")");
	}
}
function afterOnChangeGSProduto(iNro){
	var tablename = "GUIAESTOQUERESULTADO";
	document.getElementById(tablename+"__UNIDADEMEDIDA__"+iNro).onkeyup();
	document.getElementById(tablename+"__ARMAZEM__"+iNro).onkeyup();
}
function refreshInput(tablename,fieldName){
	var id = tablename+"__"+fieldName;
	document.getElementById(id).onkeyup();
}
function calcGSA(iNro){
	// calc peso
	var sPeso1 = document.getElementById("GUIAAMOSTRADESPEJO__PESODESPEJO__"+iNro).value;
	var sPeso2 = document.getElementById("GUIAAMOSTRADESPEJO__PESOATUAL__"+iNro).value;
	var nPeso1 = parseNumberToDouble(sPeso1);
	var nPeso2 = parseNumberToDouble(sPeso2);
	var nResult = nPeso2 - nPeso1;
	document.getElementById("GUIAAMOSTRADESPEJO__PESOSALDO__"+iNro).value = parseDoubleToNumber(nResult);

	// calc qtd
	//var iQtd = nPeso1/60;
	//document.getElementById("GUIAAMOSTRADESPEJO__QUANTIDADE__"+iNro).value = parseDoubleToNumber(iQtd);

	// calc reserva
	var nResProva = parseNumberToDouble(document.getElementById("GUIAAMOSTRADESPEJO__QTDRESERVADAPROVA__"+iNro).value);
	var nResResult = parseNumberToDouble(document.getElementById("GUIAAMOSTRADESPEJO__QTDRESERVADARESULT__"+iNro).value);
	var nResDif = nResProva - nResResult;
	document.getElementById("GUIAAMOSTRADESPEJO__QTDDIFERENCA__"+iNro).value = parseDoubleToNumber(nResDif);
}
function parseStringToFloat(str){
	if (str == "" || str == undefined || str.length != str.replace(/[A-Za-z]/g, "").length)
		str = "0";
	str = str.replace(".","");
	str = str.replace(",",".");
	return parseFloat(str);
}
function windowOpen(msgtype, params, refresh){
	var win = window.open('index.jsp?'+getFormParams(msgtype)+params,'','scrollbars=no,menubar=no,height=600,width=900,resizable=yes,toolbar=no,status=no,location=no');
	if (refresh){
		if (typeof(Storage)!=="undefined") {
			localStorage.setItem('scrollX', window.scrollX);
			localStorage.setItem('scrollY', window.scrollY);
		}
		var timer = setInterval(function() {
			if(win.closed) {
				clearInterval(timer);
				window.location.reload(true);
			}
		}, 1000);
	}
}
function setScroll(){
	window.onload = function (){
		if (typeof(Storage)!=="undefined") {
			var scrollX = localStorage.getItem('scrollX');
			var scrollY = localStorage.getItem('scrollY');
			window.scrollTo(scrollX,scrollY);
		}
	}
}
function onChangeSaldoRsvFinal(){

	var oQtdLines = document.getElementById("MACROAMOSTRAXRESERVA__QTDLINES");
	if (oQtdLines){
		var max = parseInt(oQtdLines.value);
		for (var i=1; i<=max; i++){
			var codigo = document.getElementById("MACROAMOSTRAXRESERVA__CODIGO__"+i).value;
			//var codParceiro = document.getElementById("MACROAMOSTRAXRESERVA__PARCEIRO__"+i).value;
			//var codTC = document.getElementById("MACROAMOSTRAXRESERVA__AMOSTRAXTIPOTORRA__"+i).value;
			//var codMA = document.getElementById("MACROAMOSTRA").value;
			var sQtd = document.getElementById("MACROAMOSTRAXRESERVA__QUANTIDADE__"+i).value;
			getValueByAjax4("MACROAMOSTRAXRESERVA__QTDSALDO__"+i,"getSaldoRsvFinal","CODIGO="+codigo+";QUANTIDADE="+sQtd+"","refreshInput('MACROAMOSTRAXRESERVA','QTDSALDO__"+i+"')");
		}
	}
}
function mostraDialog(msgtype,idInputOrigem,idInputDestino,params){
	var oObj = document.getElementById("divDialog2");
	var oObjBody = document.getElementById("divDialogBody2");
	if (oObj){
		oObj.style.display = "block";
		oObj.style.visibility = "visible";
		oObj.style.top = 80;
		oObj.style.left = 20;
		var oidInput = document.getElementById(idInputDestino);
		if (oidInput){
			openAjax("index.jsp?"+getFormParams(msgtype)+"&params="+params+"&idInputOrigem="+idInputOrigem+"&idInputDestino="+idInputDestino,"","divDialogBody2");
		}
	}
}
function showAlt(text){
	var x = event.clientX;
	var y = event.clientY + getScrollY();
	var divDialog = document.getElementById("divAlt");
	if (divDialog){
		divDialog.style.block = "block";
		divDialog.style.visibility = "visible";
		divDialog.style.top = y;
		divDialog.style.left = x;
		divDialog.innerHTML = "<div onclick='closeAlt()'><img src='imagens/icone_fecha.png'></div><br>"+text;
	}
}
function showAlt2(text){
	var x = event.clientX;
	var y = event.clientY + getScrollY();
	var divDialog = document.getElementById("divAlt");
	if (divDialog){
		divDialog.style.block = "block";
		divDialog.style.visibility = "visible";
		divDialog.style.padding = 5;
		divDialog.style.width = 50;
		divDialog.style.height = 20;
		divDialog.style.top = y - 20;
		divDialog.style.left = x;
		divDialog.innerHTML = text;
	}
}
function closeAlt(){
	var divDialog = document.getElementById("divAlt");
	if (divDialog){
		divDialog.style.block = "none";
		divDialog.style.visibility = "hidden";
	}
}
function getScrollY(){
    if (window.pageYOffset != undefined) {
        return pageYOffset;
    } else {
        var sy, d = document,
            r = d.documentElement,
            b = d.body;
        sy = r.scrollTop || b.scrollTop || 0;
        return sy;
    }
}
function setDataList(idDataList, idCodigo, idDescricao, tablename, filter, idReference){
	var aListDescricao = document.getElementById(idDataList);
	var descricaoListDescricao = document.getElementById(idDescricao);
	var inputCodigo = document.getElementById(idCodigo);
	var inputReference = document.getElementById(idReference);

	var codigoReference = (inputReference) ? inputReference.value : "" ;
	inputCodigo.title = "";

	if (descricaoListDescricao.value.trim().length <= 1)
		return;

	var url = 'index.jsp?'+"&empresa="+document.getElementById("empresa").value;
	var param = '&msgtype=getDataListByAjax';
	param += '&tablenameSearch='+tablename;
	param += '&textSearch='+descricaoListDescricao.value;
	param += '&codigoReference='+codigoReference;
	param += '&filter='+filter;
	param += getFormParams2('formMenuItem');
	var xmlhttp;
	d = new Date();
	if (window.XMLHttpRequest) 	{
		xmlhttp=new XMLHttpRequest();
	} else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4){
			if (xmlhttp.status==200){
				aListDescricao.innerHTML = xmlhttp.responseText;
				console.log("Find "+descricaoListDescricao.value+" : "+xmlhttp.responseText);
			}
		}
	};
	xmlhttp.open('POST',url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=UTF-8');
	xmlhttp.send(param);

}
function getValidaDataList(idDataList,idCodigo,idDescricao){
	console.log("getValidaDataList");
	var codigoListDescricao = document.getElementById(idCodigo);
	var descricaoListDescricao = document.getElementById(idDescricao);
	if (codigoListDescricao.value.trim().length == 0){
		descricaoListDescricao.value = "";
	} else if ("" === descricaoListDescricao.value){
		getCodigoOfDataList(idDataList,idCodigo,idDescricao);
	}
}
function getCodigoOfDataList(idDataList,idCodigo,idDescricao){
	console.log("getCodigoOfDataList");
	var aListDescricao = document.getElementById(idDataList);
	var codigoListDescricao = document.getElementById(idCodigo);
	var descricaoListDescricao = document.getElementById(idDescricao);
	//if (aListDescricao.options.length == 0)
	//	codigoListDescricao.value = "";
	var found = false;
	for (var i=0; i<aListDescricao.options.length; i++){
		if (aListDescricao.options.item(i).value == descricaoListDescricao.value){
			codigoListDescricao.value = aListDescricao.options.item(i).id;
			codigoListDescricao.dispatchEvent(new Event('change'));
			found = true;
		}
	}
	if (!found && codigoListDescricao.title == ""){
		codigoListDescricao.value = "";
	}
}
function onChangeGSS(oThis){
	var codAmostras = "";
	var tableName = "GUIAAMOSTRASAIDAITEM";
	var codigoGuia = document.getElementById("CODIGO").value;
	var nroGuia = document.getElementById("NOME").value;

	var nTotPeso = 0;
	var nTotQtd2 = 0;
	var nTotDif = 0;

	var mode = 0;
	if (oThis){
		var aId = oThis.id.split("__");
		if (aId.length == 3 && aId[0] == tableName){
			mode = 1;
		}
	}


	var oQtdLines = document.getElementById(tableName+"__QTDLINES");
	var nTotPesoDespejo = 0;
	if (oQtdLines){
		var nTotQtd = 0;
		var nTotPesoAtual = 0;
		for (var i=1; i<=parseInt(oQtdLines.value); i++){
			var oChk = document.getElementById(tableName+"__CHK__"+i);
			if (oChk.value != "true")
				continue;

			var codAmostra = document.getElementById(tableName+"__MACROAMOSTRA__"+i).value;
			var nPeso = parseNumberToDouble(document.getElementById(tableName+"__PESO__"+i).value);
			var nQtd2 = parseNumberToDouble(document.getElementById(tableName+"__QUANTIDADE2__"+i).value);
			var nDif = parseNumberToDouble(document.getElementById(tableName+"__PESODIFERENCIAL__"+i).value);
			var sEmbalagem = document.getElementById(tableName+"__EMBALAGEM__"+i).value;

			nTotPeso += nPeso;
			nTotQtd2 += nQtd2;
			nTotDif += nDif;

			if (mode == 1){
				var iNro = aId[2];
				if (iNro == i){
					getValueByAjax3(tableName+"__PARCEIRO2__"+iNro,"MACROAMOSTRA","PARCEIRO",codAmostra,"refreshInput('"+tableName+"','PARCEIRO2__"+iNro+"')");
					getValueByAjax4(tableName+"__PESODIFERENCIAL__"+iNro,"getGSSDiferencial","PESO="+nPeso+";EMBALAGEM="+sEmbalagem+";QUANTIDADE="+nQtd2,"afterCalcDiferencial("+iNro+")");
				}
			}
		}
		document.getElementById("TOTAL__"+tableName+"__PESO").value = parseDoubleToNumber(nTotPeso);
		document.getElementById("TOTAL__"+tableName+"__QUANTIDADE2").value = parseDoubleToNumber(nTotQtd2);
		document.getElementById("TOTAL__"+tableName+"__PESODIFERENCIAL").value = parseDoubleToNumber(nTotDif);

	}
}
function afterCalcDiferencial(iNro){
	var tableName = "GUIAAMOSTRASAIDAITEM";
	var nTotDif = 0;
	var oQtdLines = document.getElementById(tableName+"__QTDLINES");
	var nTotPesoDespejo = 0;
	if (oQtdLines){
		var nTotQtd = 0;
		var nTotPesoAtual = 0;
		for (var i=1; i<=parseInt(oQtdLines.value); i++){
			var oChk = document.getElementById(tableName+"__CHK__"+i);
			if (oChk.value != "true")
				continue;
			nTotDif += parseNumberToDouble(document.getElementById(tableName+"__PESODIFERENCIAL__"+i).value);
		}
		document.getElementById("TOTAL__"+tableName+"__PESODIFERENCIAL").value = parseDoubleToNumber(nTotDif);
	}

}
function onChangeNovaTarefa(oThis){

	var nTotQtdHas = 0;
	var nTotQtdHasApl = 0;
	var oQtdLines = document.getElementById("MACROTAREFAXTALHAO__QTDLINES");
	if (oQtdLines){
		for (var i=1; i<=parseInt(oQtdLines.value); i++){
			var oChk = document.getElementById("MACROTAREFAXTALHAO"+"__CHK__"+i);
			if (oChk.value != "true")
				continue;

			var nQtdHas = parseNumberToDouble(document.getElementById("MACROTAREFAXTALHAO"+"__QTDHAS__"+i).value);
			var nPorcent = parseNumberToDouble(document.getElementById("MACROTAREFAXTALHAO"+"__PORCENTAGEM__"+i).value);
			var nQtdApl = nQtdHas*(nPorcent/100);
			document.getElementById("MACROTAREFAXTALHAO"+"__QTDHASAPL__"+i).value = parseDoubleToNumber(nQtdApl);

			nTotQtdHas += nQtdHas;
			nTotQtdHasApl += nQtdApl;
		}
		document.getElementById("QTDHAS").value = parseDoubleToNumber(nTotQtdHas);
		document.getElementById("QTDHASAPL").value = parseDoubleToNumber(nTotQtdHasApl);
		document.getElementById("PORCENT").value = parseDoubleToNumber( (nTotQtdHasApl/nTotQtdHas) * 100);
	}
	calcQtdTanque();
	validaMacrotarefa();
}
function onChangeMacroTarefaxTalhao(oThis){
	if (oThis){
		var aId = oThis.id.split("__");
		if (aId.length == 3){
			nro = aId[2];
			var codTalhao = document.getElementById("MACROTAREFAXTALHAO__TALHAO__"+nro).value;
			getValueByAjax3("MACROTAREFAXTALHAO__QTDHAS__"+nro,"TALHAO","QTDHAS",codTalhao,"calcQtdTanque()");
			if(document.getElementById("MACROTAREFAXTALHAO__PORCENTAGEM__"+nro).value == '0,00'){
				document.getElementById("MACROTAREFAXTALHAO__PORCENTAGEM__"+nro).value = '100,00';
				getValueByAjax2("MACROTAREFAXTALHAO__QTDHASAPL__"+nro,"TALHAO","QTDHAS",codTalhao);
			}

		}
	}
	validaMacrotarefa();
}
function move(posicaoAtual, total) {
	perc = ((total/posicaoAtual) * 100).toFixed(0);
	var elem = document.getElementById("myBar");
	elem.style.width = perc + "%";
	document.getElementById("loading").style.visibility = "hidden";
}
function toggleTableLine(mFuncDemitidos) {
		mFuncDemitidos = mFuncDemitidos.split(" ");
		var linha;
		console.log(mFuncDemitidos);
		for (i = 0; i < mFuncDemitidos.length; i++) {
			//console.log(document.getElementById('someIDThatExists').style.display);
			linha = document.getElementById("__DEM"+mFuncDemitidos[i]);
			if (window.getComputedStyle(linha).visibility === "hidden") {
				console.log("Not Visible");
				linha.style.visibility = "visible";
    		linha.style.display = null;
				linha.style.backgroundColor = "#ffddcc";
  		}else{
				console.log("Visible");
				linha.style.visibility = "hidden";
				linha.style.display = "none";
			}
		}

}
function mostraConsultaRapida(oThis, tableName){
		var oDiv = document.getElementById("divDialog3");
		oDiv.style.display = "block";
		oDiv.style.visibility = "visible";

		var url = "index.jsp?";
		url += getFormParams("ConsultaPadraoRapida");
		url += "&tablename="+tableName;
		url += "&fieldname="+getValueById("FIELDNAME");
		console.log(url);
		openAjax(url,'','divDialogBody3');
}
function limpaTalhoesTarefa() {
    var elems = document.querySelectorAll("[id^='MACROTAREFAXTALHAO__CHK__']")
    for (let index = 0; index < elems.length; index++) {
        var element = elems[index];
        var split = element.name.split('__');
        if (split[2] != '999'){
            delTableRow('MACROTAREFAXTALHAO','trMACROTAREFAXTALHAO__'+split[2]+'');
        }
    }
    addNewTableRow('MACROTAREFAXTALHAO');
}
function checkerModal(idCheckBox,IdInputNovo,idInputTemp,idInputJust) {
	var inputTemp = document.getElementById(idInputTemp);
	var inputNovo = document.getElementById(IdInputNovo);
	var inputJust = document.getElementById(idInputJust);
	if (inputTemp.value != inputNovo.value && inputNovo.value != '  :  ' && inputNovo.value != '') {
    	document.getElementById(idCheckBox).click();
		inputTemp.value = inputNovo.value;
		inputJust.focus();
	}
}
function check(idCheckBox) {
	document.getElementById(idCheckBox).click();
}
function mudarOpacidade(id) {
	var opacidade = document.getElementById(id).style.opacity;
	if (opacidade == 1 || opacidade == ''){
		document.getElementById(id).style.opacity = .2;
	} else {
		document.getElementById(id).style.opacity = 1;
	}
}
function focusON(idInputDestino){
	var inputDestino = document.getElementById(idInputDestino);
	inputDestino.focus();
}
function validaHoraManutencao(oInput){
	var ok = true;
	var aValue = oInput.value.split(":");
	if (aValue.length == 2){
		if (aValue[0].trim().length != 2 || aValue[1].trim().length != 2 )
			ok = false;
		if (parseInt(aValue[0]) > 23 || parseInt(aValue[1]) > 59)
			ok = false;
	} else {
		ok = false;
	}
	if (!ok){
		oInput.value = "";
	}
}