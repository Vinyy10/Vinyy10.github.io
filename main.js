// Dados
const dados = {
    trimestre: ["1TRI", "2TRI", "3TRI"],
    exportacao_total: ["823", "626", "528"],
    exportacao_petróleo: ["599", "411", "363"],
    exportacao_óleo_combustível: ["171", "177", "125"],
    exportacao_outros_derivados: ["53", "38", "40"],
    importacao_total: ["294", "358", "441"],
    importacao_petróleo: ["152", "129", "145"],
    importacao_diesel: ["46", "93", "171"],
    importacao_gasolina: ["41", "52", "26"],
    importacao_glp: ["39", "66", "55"],
    importacao_outros_derivados: ["16", "18", "44"]
};

// Configuração do gráfico de barras
var chartDom = document.getElementById('grafico');
var myChart = echarts.init(chartDom);
var option = {
    title: {
        text: 'Importação e Exportação Petrobrás 2023',
        subtext: "Mil barris por dia (Mbpd)",
        subtextStyle: {
            top: 10 // Define a posição vertical do subtexto
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['Exportação Total', 'Importação Total', 'Exportação de Petróleo', 'Importação de Petróleo'],
        orient: "horizontal",
        top: 40
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: dados.trimestre
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Exportação Total',
            type: 'bar',
            data: dados.exportacao_total.map(value => parseFloat(value)),
            animation: true,
            animationDuration: 1000,
            animationEasing: "bounce",
            label: {
                show: true,
                position: "top",
            },
        },
        {
            name: 'Importação Total',
            type: 'bar',
            data: dados.importacao_total.map(value => parseFloat(value)),
            animation: true,
            animationDuration: 1000,
            animationEasing: "bounce",
            label: {
                show: true,
                position: "top",
            },
        },
        {
            name: 'Exportação de Petróleo',
            type: 'bar',
            data: dados.exportacao_petróleo.map(value => parseFloat(value)),
            animation: true,
            animationDuration: 1000,
            animationEasing: "bounce",
            label: {
                show: true,
                position: "top",
            },
        },
        {
            name: 'Importação de Petróleo',
            type: 'bar',
            data: dados.importacao_petróleo.map(value => parseFloat(value)),
            animation: true,
            animationDuration: 1000,
            animationEasing: "bounce",
            label: {
                show: true,
                position: "top",
            },
        }
    ]
};

// Configuração do gráfico de pizza
var pizzaDom = document.getElementById('pizza');
var pizzaChart = echarts.init(pizzaDom);
var pizzaOption = {
    title: {
        text: 'Detalhes',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#333'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'right', // Ajusta a posição da legenda para a direita
        top: 20,
        data: ['Exportação Total', 'Importação Total', 'Exportação de Petróleo', 'Importação de Petróleo']
    },
    series: [
        {
            name: 'Detalhes',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'inside',
                formatter: '{b}: {c} ({d}%)'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: []
        }
    ]
};

// Função para exibir o gráfico de pizza
function exibirGraficoPizza(index) {
    pizzaOption.series[0].data = [
        { value: dados.exportacao_total[index], name: 'Exportação Total' },
        { value: dados.importacao_total[index], name: 'Importação Total' },
        { value: dados.exportacao_petróleo[index], name: 'Exportação de Petróleo' },
        { value: dados.importacao_petróleo[index], name: 'Importação de Petróleo' }
    ];
    pizzaOption && pizzaChart.setOption(pizzaOption);
}

// Adicionando um evento de clique ao gráfico de barras para exibir ou desativar o gráfico de pizza
myChart.on('click', function(params) {
    var index = params.dataIndex;
    if (pizzaOption.series[0].data.length === 0) {
        exibirGraficoPizza(index);
    } else {
        pizzaOption.series[0].data = []; // Limpa os dados do gráfico de pizza
        pizzaOption && pizzaChart.setOption(pizzaOption);
    }
});

// Aplicando a configuração dos gráficos
option && myChart.setOption(option);
pizzaOption && pizzaChart.setOption(pizzaOption);
