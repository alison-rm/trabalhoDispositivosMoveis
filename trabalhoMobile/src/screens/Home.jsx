import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const Home = ({ navigation }) => {
    const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const countriesPerPage = 10;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryPress = (country) => {
    navigation.navigate('CountryDetails', { country });
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(countries.length / countriesPerPage);
    if (currentPage < maxPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const currentCountries = countries.slice(startIndex, endIndex);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => handleCountryPress(item)}
    >
      <Image
        source={{ uri: item.flags.png }}
        style={styles.countryImage}
      />
      <View>
        <Text style={styles.countryName}>{item.name.common}</Text>
        <Text style={styles.countryCapital}>Capital: {item.capital}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={currentCountries}
        renderItem={renderItem}
        keyExtractor={(item) => item.cca3}
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.button, currentPage === 0 && styles.disabledButton]}
          onPress={handlePreviousPage}
          disabled={currentPage === 0}
        >
          <Text>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>Página {currentPage + 1}</Text>
        <TouchableOpacity
          style={[
            styles.button,
            (currentPage + 1) * countriesPerPage >= countries.length &&
              styles.disabledButton,
          ]}
          onPress={handleNextPage}
          disabled={(currentPage + 1) * countriesPerPage >= countries.length}
        >
          <Text>Próxima</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  countryImage: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  countryCapital: {
    fontSize: 16,
    color: '#888',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageNumber: {
    fontSize: 16,
  },
});

export default Home;
