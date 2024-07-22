import db from "@/lib/db";

export default async function getAllProperties() {
    try {
        const properties = await db.property.findMany();
        return properties;
    } catch {
        return null;
    }
}
