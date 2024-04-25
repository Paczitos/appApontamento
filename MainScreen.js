// MainScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = ({ navigation }) => {
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');

  const calcularTotalHoras = () => {
    if (!horaInicio || !horaFim || !dia || !mes || !ano) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const horaInicioDate = new Date(`${ano}-${mes}-${dia} ${horaInicio}`);
    const horaFimDate = new Date(`${ano}-${mes}-${dia} ${horaFim}`);
    const diferencaHoras = (horaFimDate - horaInicioDate) / (1000 * 60 * 60); // diferença em horas

    if (diferencaHoras < 0) {
      Alert.alert('Erro', 'A hora de término deve ser posterior à hora de início.');
      return;
    }

    const registro = {
      dia,
      mes,
      ano,
      horaInicio,
      horaFim,
      totalHoras: diferencaHoras.toFixed(2),
    };

    // Salvando o registro
    AsyncStorage.getItem('registros').then((data) => {
      const registros = data ? JSON.parse(data) : [];
      registros.push(registro);
      AsyncStorage.setItem('registros', JSON.stringify(registros)).then(() => {
        Alert.alert('Sucesso', 'Registro salvo com sucesso!');
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text>Registro de Horas Trabalhadas</Text>
      <TextInput
        style={styles.input}
        placeholder="Dia"
        keyboardType="numeric"
        value={dia}
        onChangeText={setDia}
      />
      <TextInput
        style={styles.input}
        placeholder="Mês"
        keyboardType="numeric"
        value={mes}
        onChangeText={setMes}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano"
        keyboardType="numeric"
        value={ano}
        onChangeText={setAno}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora de início (formato: HH:MM)"
        value={horaInicio}
        onChangeText={setHoraInicio}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora de fim (formato: HH:MM)"
        value={horaFim}
        onChangeText={setHoraFim}
      />
      <Button title="Calcular Total de Horas" onPress={calcularTotalHoras} />
      <Button
        title="Ver Registros de Horas"
        onPress={() => navigation.navigate('RegistroHoras')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default MainScreen;
