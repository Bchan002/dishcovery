package finalProject.dishcoveryServer.service.RecipeService;

import java.util.ArrayList;
import java.util.List;
import java.io.*;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import finalProject.dishcoveryServer.repository.RecipeRepository.recipeRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class RecipeService {

    @Autowired
    private recipeRepository recipeRepo;

    @Value("${API_KEY}")
    private String API_KEY;

    private String GET_URL = "https://api.spoonacular.com/recipes/random";

    public void storePopularRecipe(String tags) {
        
        
        
        
        String url = UriComponentsBuilder
                .fromUriString(GET_URL) // base url
                .queryParam("number", "10")
                .queryParam("tags", tags)
                .queryParam("apiKey", API_KEY)
                .toUriString();

        // Step 1: Configure the request
        RequestEntity<Void> req = RequestEntity
                .get(url)
                .accept(MediaType.APPLICATION_JSON)
                .build();

        // Step 2: Create a RestTemplate
        RestTemplate template = new RestTemplate();

        // Step 3: Configure the response
        ResponseEntity<String> resp;

        try {

            // Step 4: Send the request and get the resposne as a String
            resp = template.exchange(req, String.class);

            /// If required can check for status code 
            // Check for errors
            if (resp.getStatusCode().is4xxClientError()) {
                throw new Exception("Authentication failed: Invalid username or password");
            }

            // Step 5: Extract the payload (JSON String format)
            String payload = resp.getBody();

            // Step 6: Read the JSON format payload
            Reader reader = new StringReader(payload);
            JsonReader jsonReader = Json.createReader(reader);

            // Step 7: check whether is it an JSON object or JSON array
            JsonObject jsonObject = jsonReader.readObject();
            JsonArray jsonArray = jsonObject.getJsonArray("recipes");

           List<Document> docs = convertJsonToDocumentList(jsonArray, tags);

            // Send to repository
            recipeRepo.saveRecipe(docs);

        } catch (Exception ex) {
            ex.printStackTrace();

        }

    }



    public List<Document> convertJsonToDocumentList(JsonArray jsonArray, String category){

            List<Document> docs = new ArrayList<>();
            for (int i = 0; i < jsonArray.size(); i++) {

                JsonObject recipeJson = jsonArray.getJsonObject(i);

                Document recipeDoc = new Document()
                        .append("recipeId", recipeJson.getInt("id"))
                        .append("title", recipeJson.getString("title"))
                        .append("category",category)
                        .append("readyInMinutes", recipeJson.getInt("readyInMinutes"))
                        .append("servings", recipeJson.getInt("servings"))
                        .append("image", recipeJson.getString("image", ""))
                        .append("summary", recipeJson.getString("summary", ""))
                        .append("instructions", recipeJson.getString("instructions", ""));

                List<Document> ingredients = new ArrayList<>();
                JsonArray ingredientsArray = recipeJson.getJsonArray("extendedIngredients");

                for (int j = 0; j < ingredientsArray.size(); j++) {
                    JsonObject ingredientJson = ingredientsArray.getJsonObject(j);
                    Document ingredientDoc = new Document()
                            .append("name", ingredientJson.getString("name"))
                            .append("amount", ingredientJson.getJsonNumber("amount").doubleValue())
                            .append("unit", ingredientJson.getString("unit", ""));

                    ingredients.add(ingredientDoc);

                }

                recipeDoc.put("ingredients", ingredients);

                docs.add(recipeDoc);

            }

            return docs;
    }

}
