import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'



export const registerUser=createAsyncThunk(
    'auth/register',
    async (userData,{rejectWithValue})=>{
      try{
        const response= await axiosClient.post('/user/register',userData)
        return response.data.user
      } 
      catch(error){
          rejectWithValue(error)
      }   
    }
)
export const loginUser=createAsyncThunk(
    'auth/login',
    async (userData,{rejectWithValue})=>{
      try{
        const response= await axiosClient.post('/user/login',userData)
        return response.data.user
      } 
      catch(error){
          rejectWithValue(error)
      }   
    }
)

export const checkAuth=createAsyncThunk(
    'auth/check',
    async (_,{rejectWithValue})=>{
      try{
        const {response}= await axiosClient.get('/user/check')
        return response.user
      } 
      catch(error){
          rejectWithValue(error)
      }   
    }
)

export const logoutUser=createAsyncThunk(
    'auth/logout',
    async (_,{rejectWithValue})=>{
      try{
       await axiosClient.post('/logout')
        return null
      } 
      catch(error){
          rejectWithValue(error)
      }   
    }
)





const authSlice = createSlice({
  name: 'auth',
  initialState:{
     user:null,
     isAuthenticated:false,
     loading:false,
     error:null
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder
    //registeruser
    .addCase(registerUser.pending,(state)=>{
      state.loading=true,
      state.error=null
    })
    .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=!!action.payload,
        state.user=action.payload
    })
    .addCase(registerUser.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message|| "something went wrong"
        state.isAuthenticated=false,
        state.user=null
    })
    //login user
    .addCase(loginUser.pending,(state)=>{
      state.loading=true,
      state.error=null
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=!!action.payload,
        state.user=action.payload
    })
    .addCase(loginUser.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message|| "something went wrong"
        state.isAuthenticated=false,
        state.user=null
    })
    //chcek auth
     .addCase(registerUser.pending,(state)=>{
      state.loading=true,
      state.error=null
    })
    .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=!!action.payload,
        state.user=action.payload
    })
    .addCase(registerUser.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message|| "something went wrong"
        state.isAuthenticated=false,
        state.user=null
    })
    //login user
    .addCase(loginUser.pending,(state)=>{
      state.loading=true,
      state.error=null
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=!!action.payload,
        state.user=action.payload
    })
    .addCase(loginUser.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message|| "something went wrong"
        state.isAuthenticated=false,
        state.user=null
    })
    //logout user
     .addCase(logoutUser.pending,(state)=>{
      state.loading=true,
      state.error=null
    })
    .addCase(logoutUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=!!action.payload,
        state.user=action.payload
    })
    .addCase(logoutUser.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message|| "something went wrong"
        state.isAuthenticated=false,
        state.user=null
    })
    //login user
    .addCase(checkAuth.pending,(state)=>{
      state.loading=true,
      state.error=null
    })
    .addCase(checkAuth.fulfilled,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=!!action.payload,
        state.user=action.payload
    })
    .addCase(checkAuth.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message|| "something went wrong"
        state.isAuthenticated=false,
        state.user=null
    })
  },
})


export default authSlice.reducer