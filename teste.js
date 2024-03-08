const dataAtual = new Date();

            // Obtenha a hora, os minutos e os segundos
            const hora = dataAtual.getHours();
            const minutos = dataAtual.getMinutes();
            const segundos = dataAtual.getSeconds();

            // Formate os valores em uma string no formato desejado
            //const horarioFormatado = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

            // Exiba o horário formatado
            horarioFormatado = '18:30:00'

            if(horarioFormatado > '08:00:00' && horarioFormatado < '18:00:00'){
                if(horarioFormatado > '12:00:00' && horarioFormatado  < '13:00:00'){
                    console.log('Horario de lanche')
                }else{
                    console.log("fora do horario de lanche");
                }
            }else{
                console.log("fora do horario de serviço");
            }