import { createClient } from "@supabase/supabase-js";

// Configuração do Supabase Externo (Gratuito) 
// Usando as chaves fornecidas pelo usuário
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://kqfwdgjblytlpihuqjbh.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_JkVVLwu5ux30vS1dsLryWA_iqbnWeYu";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
