package finalProject.dishcoveryServer.repository.RecipeRepository;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class recipeRepository {
    
    @Autowired 
    private MongoTemplate template;

    public void saveRecipe(List<Document> doc){
        
        template.insert(doc,"popularRecipe");
    }
}
