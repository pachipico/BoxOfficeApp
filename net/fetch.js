import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetch = async url => {
  try {
    let result = await AsyncStorage.getItem(url);
    if (result !== null) {
      return JSON.parse(result);
    }
    const response = await axios.get(url);
    await AsyncStorage.setItem(url, JSON.stringify(response.data));

    return response.data;
  } catch (err) {
    alert(err.message);
  }
};

export default fetch;
