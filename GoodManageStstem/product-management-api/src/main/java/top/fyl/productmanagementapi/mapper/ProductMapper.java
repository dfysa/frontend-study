package top.fyl.productmanagementapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import top.fyl.productmanagementapi.entity.Product;

/**
 * @author dfysa
 * @data 2024/10/29 上午10:26
 * @description
 */
@Mapper
public interface ProductMapper extends BaseMapper<Product> {
}
