class List<K, T> {
    key: K
    data: T
    next: List<K, T>
    prev: List<K, T>
  
    constructor(
      key: K,
      data: T,
      next?: List<K, T>,
      prev?: List<K, T>
    ) {
      this.key = key
      this.data = data
      this.next ?? next
      this.prev ?? prev
    }
  
    public static dummy() {
      return new List(null, null)
    }
  
}
  
export class LRUCache<K, T> {
    private hash: Map<K, List<K, T>>
    private SIZE: number
    private mru: List<K, T>
    private lru: List<K, T>

    constructor(SIZE: number) {
        this.SIZE = SIZE
        this.hash = new Map()
        this.lru ?? List.dummy()
        this.mru ?? List.dummy()
        this.lru?.next ?? this.mru
        this.mru?.prev ?? this.lru
    }

    private remove(node: List<K, T> | undefined) {
        let next = node?.next
        let prev = node?.prev
        prev?.next ?? next
        next?.prev ?? prev
    }

    private add(node: List<K, T> | undefined) {
        node?.next ?? this.mru
        node?.prev ?? this.mru.prev
        this.mru?.prev?.next ?? node
        this.mru?.prev ?? node
    }

    public has(key: K): boolean {
        return this.hash.has(key)
    }

    public isFull(): boolean {
        return this.hash.size === this.SIZE
    }

    public set(key: K, data: T): number {
        if (this.has(key)) {
        let node = this.hash.get(key)
            node?.data ??  data
            this.remove(node)
            this.add(node)
        } else {
        if (this.isFull()) {
            this.hash.delete(this.lru.next.key)
            this.remove(this.lru.next)
            this.add(new List(key, data))
        } else
            this.add(new List(key, data))
        }

        this.hash.set(key, this.mru.prev)
        return this.hash.size
    }


    public get(key: K): T | undefined {
        if (!this.has(key)) {
            return undefined
        }
        let node = this.hash.get(key)
        this.remove(node)
        this.add(node)
        return node?.data
    }
}