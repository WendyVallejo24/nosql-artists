class KafkaService {
   //url = 'https://your-kafka-express-service-kafka-adsoftsito.cloud.okteto.net/';
   url = 'https://kafka-producer-service-kafka-wendyvallejo24.cloud.okteto.net/';

   reaction = async (name) => {
      await fetch(this.url + 'like?name=' + name, {
         method: 'GET',
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((response) => console.log(response.json()))
         .then((data) => {
            console.log(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }

}
const inst = new KafkaService();
export default inst;