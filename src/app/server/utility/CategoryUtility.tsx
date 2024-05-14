import { Category } from '../models/Category';

interface CategoryData {
    id: number;
    parent_id: number;
    order_level: number;
    // Add other properties as needed
}

export default class CategoryUtility {
    // When with trashed is true id will get even the deleted items
    public static async getImmediateChildren(id: number, withTrashed: boolean = false, asArray: boolean = false): Promise<CategoryData[]> {
        const children = await Category.query().where('parent_id', id).orderBy('order_level', 'desc');
        
        if (asArray && children) {
            return children.toJSON();
        }

        return children;
    }

    public static async getImmediateChildrenIds(id: number, withTrashed: boolean = false): Promise<number[]> {
        const children = await CategoryUtility.getImmediateChildren(id, withTrashed, true);
        return children ? children.map(child => child.id) : [];
    }

    public static async getImmediateChildrenCount(id: number, withTrashed: boolean = false): Promise<number> {
        const count = await Category.query().where('parent_id', id).count();
        return count;
    }

    // When with trashed is true id will get even the deleted items
    public static async flatChildren(id: number, withTrashed: boolean = false, container: CategoryData[] = []): Promise<CategoryData[]> {
        const children = await CategoryUtility.getImmediateChildren(id, withTrashed, true);

        if (children && children.length > 0) {
            for (const child of children) {
                container.push(child);
                await CategoryUtility.flatChildren(child.id, withTrashed, container);
            }
        }

        return container;
    }

    // When with trashed is true id will get even the deleted items
    public static async childrenIds(id: number, withTrashed: boolean = false): Promise<number[]> {
        const children = await CategoryUtility.flatChildren(id, withTrashed);
        return children ? children.map(child => child.id) : [];
    }

    public static async categoryTreeIds(category: Category, categoryIds: number[]): Promise<number[]> {
        for (const childCategory of category.childrenCategories) {
            categoryIds.push(childCategory.id);
            
            if (childCategory.childrenCategories.length > 0) {
                await CategoryUtility.categoryTreeIds(childCategory, categoryIds);
            }
        }
        return categoryIds;
    }

    public static async moveChildrenToParent(id: number): Promise<void> {
        const childrenIds = await CategoryUtility.getImmediateChildrenIds(id, true);
        const category = await Category.query().findOne({ id });

        await CategoryUtility.moveLevelUp(id);

        await Category.query().whereIn('id', childrenIds).update({ parent_id: category.parent_id });
    }

    public static async createInitialCategory(key: string): Promise<boolean> {
        // Implement your logic here
        return true;
    }

    public static async moveLevelUp(id: number): Promise<void> {
        const childrenIds = await CategoryUtility.getImmediateChildrenIds(id, true);
        if (childrenIds.length > 0) {
            for (const value of childrenIds) {
                const category = await Category.query().findById(value);
                category.level -= 1;
                await category.$query().update({ level: category.level });
                await CategoryUtility.moveLevelUp(value);
            }
        }
    }

    public static async moveLevelDown(id: number): Promise<void> {
        const childrenIds = await CategoryUtility.getImmediateChildrenIds(id, true);
        if (childrenIds.length > 0) {
            for (const value of childrenIds) {
                const category = await Category.query().findById(value);
                category.level += 1;
                await category.$query().update({ level: category.level });
                await CategoryUtility.moveLevelDown(value);
            }
        }
    }

    public static async deleteCategory(id: number): Promise<void> {
        const category = await Category.query().findById(id);
        if (category) {
            await CategoryUtility.moveChildrenToParent(category.id);
            await category.$query().delete();
        }
    }
}
