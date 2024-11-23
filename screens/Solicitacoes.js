import React, { useCallback, useEffect, useState } from "react";
import { Button, FlatList, Platform, StyleSheet } from "react-native";
import { Block, Text, Input, Card, theme } from "galio-framework";
import { api } from "../services/api";
import dateFormat from 'dateformat';
import { materialTheme } from "../constants";
import DateTimePicker from '@react-native-community/datetimepicker';



export default function TabelaComFiltro() {
  const [data, setData] = useState();
  const [filter, setFilter] = useState("");
  const [filterdata, setFilterData] = useState("");
  const [showPicker, setShowPicker] = useState(false);



  const loadData = async () => {
    try {
      const { data, status } = await api.get('/votos/');
      if (status == 200) {
        setData(data.table);
      }
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  };


  const handleSearch = async (text) => {
    setFilter(text);
    if (text === "") {
      loadData();
    } else {
      const filteredData = data.filter((item) =>
        item.campanha.toLowerCase().includes(text.toLowerCase()) ||
        item.createdAt.toLowerCase().includes(text.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const handleDateChange = (event, selectedDate) => { 
    setShowPicker(false); // Fecha o DatePicker

   
    if (selectedDate) {
      const formattedDate = dateFormat(selectedDate, 'dd/mm/yyyy');
      if(filterdata){
          loadData()
      }
      
      setFilterData(formattedDate);
      // Filtra os dados que correspondem à data selecionada
      const filteredData = data.filter((item) => { 
        const itemDate = new Date(item.createdAt);
        const itemFormatted = dateFormat(itemDate, 'dd/mm/yyyy');
        return itemFormatted === formattedDate; // Comparação exata
      });
      console.log('Data selecionada:', filterdata);
      setData(filteredData);
    }
  };
 

  useEffect(() => {
    loadData()



  }, []);

  const renderItem = ({ item }) => (
    <Block style={styles.row} card shadow>
      <Text style={styles.cell}>{item.campanha}</Text>
      <Text style={styles.cell}>
        {dateFormat(new Date(item.createdAt), "dd/mm/yyyy")}
      </Text>
    </Block>
  );

  return (
    <Block flex style={styles.container}>
      <Text h4 bold style={styles.title}>
        Solicitações
      </Text>

      <Input
        placeholder="Filtrar por nome"
        rounded
        icon="search"
        family="font-awesome"
        iconSize={16}
        iconColor={theme.COLORS.MUTED}
        value={filter}
        onChangeText={handleSearch}
        style={styles.input}
      />
      {/* Botão para abrir o DatePicker */}
      <Button title="Filtrar por Data" onPress={() => setShowPicker(true)} />

      {/* Mostra a data selecionada */}
      {filterdata && <Text style={styles.filterText}>Filtro: {filterdata}</Text>}

      {/* DatePicker */}
      {showPicker && (
        <DateTimePicker
          value={new Date()} // Data inicial
          mode="date" // Modo de seleção de data
          display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Estilo
          onChange={handleDateChange}
        />
      )}


      <Block style={styles.table}>
        <Block style={styles.tableHeader} row>
          <Text bold style={styles.headerCell}>
            Nome
          </Text>
          <Text bold style={styles.headerCell}>
            Data
          </Text>
        </Block>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text muted style={styles.emptyText}>
              Nenhum resultado encontrado.
            </Text>
          }
        />
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  title: {
    marginBottom: theme.SIZES.BASE,
    textAlign: "center",
    color: materialTheme.COLORS.PRIMARY,
  },
  input: {
    marginBottom: theme.SIZES.BASE,
  },
  table: {
    marginTop: theme.SIZES.BASE,
    borderRadius: theme.SIZES.BASE,
    overflow: "hidden",
    backgroundColor: theme.COLORS.WHITE,
  },
  tableHeader: {
    backgroundColor: theme.COLORS.MUTED,
    paddingVertical: theme.SIZES.BASE / 2,
    paddingHorizontal: theme.SIZES.BASE,
    borderBottomWidth: 1,
    borderBottomColor: theme.COLORS.BORDER,
    justifyContent: "space-between",
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    color: theme.COLORS.WHITE,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    padding: theme.SIZES.BASE,
    marginVertical: theme.SIZES.BASE / 4,
    backgroundColor: theme.COLORS.NEUTRAL,
    justifyContent: "space-between",
    borderRadius: theme.SIZES.BASE / 2,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: theme.COLORS.BLACK,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    color: theme.COLORS.MUTED,
    marginTop: theme.SIZES.BASE,
  },
});
