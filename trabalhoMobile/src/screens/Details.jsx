import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native'; 

const Details = () => {
  const route = useRoute(); 
  const navigation = useNavigation(); 
  const { code } = route.params;

  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        setCountry(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountry();
  }, [code]);

  const handleGoBack = () => {
    navigation.goBack(); 
  };

  if (!country) {
    return <View style={styles.loading}>Carregando...</View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>{country.name.common}</Text>
        <Image
          source={{ uri: country.flags.png }}
          style={styles.countryImage}
        />
        <Text>Capital: {country.capital}</Text>
        <Text>População: {country.population}</Text>
        <Text>Região: {country.region}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGoBack}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <Button title="Tela Extra" onPress={() => navigation.navigate('Extra')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countryImage: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
