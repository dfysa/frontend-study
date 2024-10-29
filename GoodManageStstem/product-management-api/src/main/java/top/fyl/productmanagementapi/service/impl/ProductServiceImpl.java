package top.fyl.productmanagementapi.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import top.fyl.productmanagementapi.entity.Product;
import top.fyl.productmanagementapi.mapper.ProductMapper;
import top.fyl.productmanagementapi.service.ProductService;

/**
 * @author dfysa
 * @data 2024/10/29 上午10:28
 * @description
 */
@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {
}
