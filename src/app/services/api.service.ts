import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // server_url = "http://localhost:3000"
    server_url = "https://cookpedia-server-oct24.onrender.com"


  constructor(private http: HttpClient) { }

  getAllRecipiesAPI() {
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  //add testimony api
  addTestimonyAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }

  // api to register users
  registerApi(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody)
  }

  // api to login users
  loginAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody)
  }

  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }
  }

  // view a recipe
  viewRecipeAPI(recipeId: string) {
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`, this.appendToken())
  }

  // http://localhost:3000/related-recipes?cuisine=Asian
  // related recipe api
  relatedRecipeAPI(cuisine: any) {
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`, this.appendToken())
  }

  // download recipes
  // /recipe/67efb941a1c6f6cae4486cd1/download
  downloadRecipeAPI(recipeId: any, reqBody: any) {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`, reqBody, this.appendToken())
  }

  // save Recipe
  // recipe/67efb941a1c6f6cae4486ce5/save
  saveRecipeAPI(recipeId: any, reqBody: any) {
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`, reqBody, this.appendToken())
  }

  // get user saved recipe
  getUserSavedRecipeAPI() {
    return this.http.get(`${this.server_url}/get-save-recipes`, this.appendToken())
  }

  // delete saved recipes
  deleteSavedRecipeAPI(id: string) {
    return this.http.delete(`${this.server_url}/save-recipe/${id}/remove`, this.appendToken())
  }

  // get user download recipe
  getUserDownloadRecipeAPI() {
    return this.http.get(`${this.server_url}/user-download-recipes`, this.appendToken())
  }

  // edit user
  editUserApi(reqBody: any) {
    return this.http.post(`${this.server_url}/user/edit`, reqBody, this.appendToken())
  }

  // get all users
  getAllUsersAPI() {
    return this.http.get(`${this.server_url}/all-users`, this.appendToken())
  }

  // get all download list
  getAllDownloadListAPI() {
    return this.http.get(`${this.server_url}/download-list`, this.appendToken())
  }

  // get all feedback list
  getAllFeedbackListAPi() {
    return this.http.get(`${this.server_url}/all-feedbacks`, this.appendToken())
  }

  // update Feedback
  // http://localhost:3000/feedback/67f3ba54bc35176ed6a3da9f/update?status=Approved
  updateFeedbackStatusAPI(feedbackId: string, status: string) {
    return this.http.get(`${this.server_url}/feedback/${feedbackId}/update?status=${status}`, this.appendToken())
  }

  // add recipe api
  addRecipeAPI(reqBody: any){
    return this.http.post(`${this.server_url}/add-recipe`, reqBody,  this.appendToken())
  }

  // update recipe api
  updateRecipeAPI(id:string, reqBody:RecipeModel){
    return this.http.put(`${this.server_url}/recipe/${id}/udpate`, reqBody, this.appendToken())

  }

  // delete recipe
  deleteRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/recipe/${id}/remove`, this.appendToken())
  }

  getChartData(){
    this.getAllDownloadListAPI().subscribe((res:any)=>{
      console.log(res);
      
      let DownloadArrayList:any = []
      let output : any = {}

      // input : [{recipeCuisine, count}]
      // output : [{name: cuisine, y : totalcount}]

      res.forEach((item:any)=>{
        let cuisine = item.recipeCuisine
        let currenCount = item.count

        if(output.hasOwnProperty(cuisine)){
          output[cuisine] += currenCount
        }else{
          output[cuisine] = currenCount
        }
      })
      console.log(output);
      for(let cuisine in output){
        DownloadArrayList.push({name : cuisine, y : output[cuisine]})
      }
      console.log(DownloadArrayList);
      localStorage.setItem("chart", JSON.stringify(DownloadArrayList))
    })
  }


}
