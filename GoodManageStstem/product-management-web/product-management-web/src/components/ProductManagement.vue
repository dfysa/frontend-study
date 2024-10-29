<template>
  <div>
    <h1 class="text-xl mb-4">商品管理</h1>
    <el-button type="primary" @click="openCreateDialog">新增商品</el-button>
    <el-table :data="products" style="width: 100%" class="mt-4">
      <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="description" label="描述" width="500"></el-table-column>
      <el-table-column label="图片" width="120">
        <template #default="scope">
          <el-image :src="scope.row.cover" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="200"></el-table-column>
      <el-table-column prop="stock" label="库存" width="200"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="confirmDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   <!-- 11 -->
    <el-dialog v-model="isDialogOpen" title="商品信息" :close-on-click-modal="false">
      <el-form :model="form" class="p-4">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" placeholder="请输入商品描述"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" type="number" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form.stock" type="number" placeholder="请输入库存"></el-input>
        </el-form-item>
        
        <el-form-item label="图片">
          <el-upload
            action="http://localhost:8080/api/products/upload"
            list-type="picture-card"
            :on-success="handleUploadSuccess"
            :file-list="fileList"
            :limit="1"
            accept="image/*"
            class="upload-demo"
          >
            <el-icon class="upload-icon">
              <Plus />
            </el-icon>
            
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogOpen = false">取消</el-button>
        <el-button type="primary" @click="saveProduct">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.upload-demo {
  width: 100%;
  height: 120px;
 
  display: flex;
 
  align-items: center;
  margin-top: 10px;
}

.upload-icon {
  font-size: 28px;
  margin-bottom: 5px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/productStore";
import type { Product } from "../api/productService";
import {ElMessage,ElMessageBox} from "element-plus"
import {Plus}from "@element-plus/icons-vue"
const productStore = useProductStore();
const { fetchProducts, createProduct, updateProduct, deleteProduct } =
  productStore;
const products = ref<Product[]>([]);
const isDialogOpen = ref(false);
const fileList =ref([])
const form = ref<Product>({
  name: "",
  description: "",
  price: 0,
  stock: 0,
  cover: "",
});

const handleUploadSuccess=(response:any)=>{
  if(response){
    ElMessage({
      message:"上传成功!",
      type:"success",
    });
    form.value.cover=response;
}else{
      ElMessage({
      message:"上传失败!",
      type:"error",
    });
}
}
const loadProducts = async () => {
  products.value = await fetchProducts();
};
const openCreateDialog = () => {
  // form.value = { name: "", description: "", price: 0, stock: 0, cover: "" };
  isDialogOpen.value = true;
};
const openEditDialog = (product: Product) => {
  form.value = { ...product };
  isDialogOpen.value = true;
};
 

const confirmDelete= (id: number) => {
  ElMessageBox.confirm("此操作将永久删除该项，是否继续？","提示",{
    confirmButtonText:"确定",
    cancelButtonText:"取消",
    type:"warning"
  })
    .then(async()=>{
      // 执行删除操作
      await deleteProduct(id);
      await loadProducts(); // 刷新数据
    })
    .catch(()=>{
      ElMessage({
        type:"info",
        message:"已取消删除"
      });
    });


};

const saveProduct=async()=>{
  alert(JSON.stringify(form.value));
  try{
    if(form.value.id){
      await updateProduct(form.value.id,form.value);
      ElMessage({
        message:"修改成功!",
        type:"success"
      });


    }else{
      await createProduct (form.value);
           ElMessage({
        message:"新增成功!",
        type:"success"
      });
    }
    await loadProducts();

  }catch(error){

  }finally{
    isDialogOpen.value=false;
  }
}

// ⻚⾯加载时获取商品数据
onMounted(() => {
  loadProducts();
});
</script>
