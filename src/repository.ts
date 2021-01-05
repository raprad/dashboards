export interface Repository<TEntity, TKey> {
    url: string;
    fetchAll: () => Promise<TEntity[]>;
    fetchById: (key: TKey) => Promise<TEntity>;
    add: (entity: TEntity) => Promise<TEntity>;
    update: (entity: TEntity) => Promise<TEntity>;
    delete: (key: TKey) => Promise<TEntity>;
}
export function createRepository<TEntity, TKey>(url: string): Repository<TEntity, TKey> {
    return {
        url,
        fetchAll: async (): Promise<TEntity[]> => {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json() as TEntity[];
                return data;
            }
            throw new Error(response.statusText);
        },
        fetchById: async (id: TKey) => {
            const response = await fetch(url + '?id=' + String(id));
            if (response.ok) {
                const data = await response.json() as TEntity[];
                return data[0];
            }
            throw new Error(response.statusText);
        },
        add: async (item: TEntity): Promise<TEntity> => {
            const response = await fetch(url, {
                method: 'Post',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json() as TEntity;
                return data;
            }
            throw new Error(response.statusText);
        },
        update: async (item: TEntity): Promise<TEntity> => {
            const response = await fetch(url + '?primaryKey=' + (item as any).id, {
                method: 'Put',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json() as TEntity;
                return data;
            }
            throw new Error(response.statusText);
        },
        delete: async (id: TKey) => {
            const response = await fetch(url + '?id=' + String(id), {
                method: 'Delete'
            });
            if (response.ok) {
                const data = await response.json() as TEntity[];
                return data[0];
            }
            throw new Error(response.statusText);
        },
    }
}