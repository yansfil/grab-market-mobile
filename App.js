import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import BasketballImage from "./assets/products/basketball1.jpeg";
import Avatar from "./assets/icons/avatar.png";
import { API_URL } from "./config/constants";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function App() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headline}>판매되는 상품들</Text>
        <View style={styles.productList}>
          {products.map((product, index) => {
            return (
              <View style={styles.productCard}>
                <View>
                  <Image
                    style={styles.productImage}
                    source={{
                      uri: `${API_URL}/${product.imageUrl}`,
                    }}
                    resizeMode={"contain"}
                  />
                </View>
                <View style={styles.productContents}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}원</Text>
                  <View style={styles.productFooter}>
                    <View style={styles.productSeller}>
                      <Image style={styles.productAvatar} source={Avatar} />
                      <Text style={styles.productSellerName}>
                        {product.seller}
                      </Text>
                    </View>
                    <Text style={styles.productDate}>
                      {dayjs(product.createdAt).fromNow()}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  productCard: {
    width: 300,
    borderColor: "rgb(230,230,230)",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "white",
    marginBottom: 8,
  },
  productImage: {
    width: "100%",
    height: 210,
  },
  productContents: {
    padding: 8,
  },
  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  productAvatar: {
    width: 24,
    height: 24,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  productSellerName: {
    fontSize: 16,
  },
  productDate: {
    fontSize: 16,
  },
  productList: {
    alignItems: "center",
  },
  headline: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 24,
  },
});
