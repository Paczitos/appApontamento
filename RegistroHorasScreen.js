// RegistroHorasScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistroHorasScreen = () => {
  const [registros, setRegistros] = useState([]);
  const [filtroMes, setFiltroMes] = useState('');
  const [somaTotalDia, setSomaTotalDia] = useState(0);

  useEffect(() => {
    const carregarRegistros = async () => {
      try {
        const registrosArmazenados = await AsyncStorage.getItem('registros');
        if (registrosArmazenados) {
          setRegistros(JSON.parse(registrosArmazenados));
        }
      } catch (error) {
        console.error('Erro ao carregar registros:', error);
      }
    };

    carregarRegistros();
  }, []);

  useEffect(() => {
    const calcularSomaTotalDia = () => {
      const soma = registros.reduce((total, item) => {
        if (!filtroMes || item.mes === filtroMes) {
          return total + parseFloat(item.totalHoras);
        }
        return total;
      }, 0);
      setSomaTotalDia(soma);
    };

    calcularSomaTotalDia();
  }, [registros, filtroMes]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.column}>Dia: {item.dia}</Text>
        <Text style={styles.column}>Mês: {item.mes}</Text>
        <Text style={styles.column}>Ano: {item.ano}</Text>
        <Text style={styles.column}>Hora Início: {item.horaInicio}</Text>
        <Text style={styles.column}>Hora Fim: {item.horaFim}</Text>
        <Text style={styles.column}>Total do Dia: {item.totalHoras}</Text>
      </View>
    );
  };

  const filtrarPorMes = (mes) => {
    setFiltroMes(mes);
  };

  const registrosFiltrados = filtroMes
    ? registros.filter((item) => item.mes === filtroMes)
    : registros;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Soma Total do Dia: {somaTotalDia}</Text>
        </View>
        <View style={styles.header}>
        <Text style={styles.headerText}>Filtrar por Mês:</Text>
        <TextInput
          style={styles.input}
          placeholder="Número do Mês"
          keyboardType="numeric"
          value={filtroMes}
          onChangeText={(text) => filtrarPorMes(text)}
        />
      </View>
      <FlatList
        data={registrosFiltrados}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: 40,
    width: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  column: {
    marginBottom: 5,
  },
});

export default RegistroHorasScreen;
