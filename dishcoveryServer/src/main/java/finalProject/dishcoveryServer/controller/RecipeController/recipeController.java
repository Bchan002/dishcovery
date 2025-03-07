package finalProject.dishcoveryServer.controller.RecipeController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import finalProject.dishcoveryServer.service.RecipeService.RecipeService;

@RestController
@RequestMapping("/")
public class recipeController {
    
    @Autowired
    private RecipeService recipeSvc;


    @GetMapping("/recipe")
    public ResponseEntity<String> getPopularRecipe(@RequestParam String tag){

        System.out.println("Your tag is" + tag);
        recipeSvc.storePopularRecipe(tag);


        return ResponseEntity.ok().body("Successful Stored");

    }
}
