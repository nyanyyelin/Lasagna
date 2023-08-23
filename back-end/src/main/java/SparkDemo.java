import com.google.gson.Gson;
import static spark.Spark.*;

import com.mongodb.client.FindIterable;
import dto.PaymentDTO;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static com.mongodb.client.model.Filters.*;


class userDto {
  public  String username;
  public String password;
  public String email;
}

class SignUpResultDto{
  Boolean isSuccess;
  String error;

  public SignUpResultDto(Boolean isSuccess, String error) {
    this.isSuccess = isSuccess;
    this.error = error;
  }
}


public class SparkDemo {

   public static Gson gson = new Gson();

  public static void main(String[] args) {
      port(1234);

      MongoClient mongoClient = new MongoClient("localhost",27017);
      System.out.println("Connected to mongodb");

      MongoDatabase db = mongoClient.getDatabase("MyDatabase");
      MongoCollection<Document> userCollection = db.getCollection("Users");
      MongoCollection<Document> transactionCollection = db.getCollection("Transactions");


      post("/api/sign-in", (req, res) -> {

          String body = req.body();
          // System.out.println(body);
          userDto userObj = gson.fromJson(body,userDto.class);

          Document existingUser = userCollection.find(eq("username",userObj.username)).first();

          // check if user exists in the userCollection
          if(existingUser != null) {
              String existingPassword = existingUser.getString("password");
              if(existingPassword.equals(userObj.password)) {
                  var result = new SignUpResultDto(true,null);
                  return gson.toJson(result);
              }
          }

          var result = new SignUpResultDto(false,"Wrong password");
          return gson.toJson(result);
      });


      post("/api/sign-up", (req,res) -> {
        String body = req.body();

          System.out.println(body);

      userDto userObj = gson.fromJson(body,userDto.class);

      Document existingUser = userCollection.find(eq("username",userObj.username)).first();

      // check if user exists in the userCollection
      if(existingUser != null) {
        var result = new SignUpResultDto(false,"User already exists.");
        return gson.toJson(result);
      }
      // creating new user for userCollection
      Document newUser = new Document()
              .append("username",userObj.username)
              .append("password",userObj.password)
              .append("email",userObj.email);
      userCollection.insertOne(newUser);

      var result = new SignUpResultDto(true,null);
      return gson.toJson(result);

      });

      post("/api/make-payment", (req,res) -> {

          String body = req.body();
          System.out.println(body);

          PaymentDTO paymentObj = gson.fromJson(body,PaymentDTO.class);
          Document existingUser = userCollection.find(eq("username",paymentObj.receiver)).first();

          if(existingUser != null) {
              Document payment = new Document()
                      .append("sender",paymentObj.sender)
                      .append("receiver",paymentObj.receiver)
                      .append("amount",paymentObj.amount)
                      .append("note",paymentObj.note);
              transactionCollection.insertOne(payment);
              var result = new SignUpResultDto(true,null);
              System.out.println(gson.toJson(result));
              return gson.toJson(result);
          }

          var result = new SignUpResultDto(false,"Receiver does not exist.");
          return gson.toJson(result);

      });

      // getting all the transactions from transactionCollection

      get("/api/get-transactions", (res,req) -> {
          List<String> transactionList = new ArrayList<>();
          FindIterable<Document> transactionDocuments = transactionCollection.find();

          for(Document doc : transactionDocuments) {
              String sender = doc.getString("sender");
              String receiver = doc.getString("receiver");
              double amount = doc.getDouble("amount");
              String note = doc.getString("note");

              String transactionHistory = sender + " sent $ " + amount + " to " +
                      receiver + ". \n" + "Message : " + note;
              transactionList.add(transactionHistory);
          }

          // to get the recent transaction history
          Collections.reverse(transactionList);

          return gson.toJson(transactionDocuments);

      });




  }
}
